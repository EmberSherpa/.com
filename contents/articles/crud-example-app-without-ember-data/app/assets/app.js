define("ember-crud-example/app",
  ["resolver","ember-crud-example/routes","ember-crud-example/initializers/storage"],
  function(Resolver, routes, storage) {
    "use strict";

    var App = Ember.Application.create({
      LOG_ACTIVE_GENERATION: true,
      LOG_VIEW_LOOKUPS: true,
      rootElement: "#ember-crud-example",
      modulePrefix: 'ember-crud-example', 
      Resolver: Resolver
    });

    App.Router.map(routes);

    Ember.Application.initializer(storage);

    return App;
  });
define("ember-crud-example/components/canvas-file",
  [],
  function() {
    "use strict";
    /* global FileReader: false */

    var CanvasFileComponent = Ember.Component.extend({
      actions: {
        start: function() {
          var that = this;
          var input = this.get('input');
          input.click();
          input.change( function( event ) {
            Ember.run( that, 'readFileData', this.files );
          });
        }
      },
      classNames: [ 'canvas-file'],
      didInsertElement: function() {
        this.resetFile();

        var canvas = this.$().find( 'canvas' );
        canvas.attr( 'width', this.get( 'width' ) );
        canvas.attr( 'height', this.get( 'height' ) );

        this.set( 'canvas', canvas );
        this.set( 'canvasContext', canvas[0].getContext( '2d' ) );
        this.set( 'img', this.$('img.preview') );
        this.set( 'shadow', this.$('img.shadow') );
        this.set( 'input', this.$().find( 'input' ) );
      },
      src: function() {
        if ( Em.isNone( this.get('value' ) ) ) {
          return "http://placehold.it/%@x%@".fmt( this.get('width'), this.get('height') );
        } else {
          return this.get('value');
        }
      }.property( 'value', 'width', 'height' ),
      readFileData: function( files ) {
        // TODO: handle scenario when multiple files are selected
        // TODO: test for file types
        if ( files.length ) {
          var file = this.get( 'file' );
          file.readAsDataURL( files[0] );
        }
      },
      resetFile: function() {
        var that = this;
        var file = new FileReader();
        file.onload = function( event ) {
          that.resetFile();
          that.resetCanvas();
          that.get('shadow').attr( 'src', event.target.result );
          Ember.run( that, 'drawImage', that.get('shadow')[0] );
          that.set( 'value', that.get('canvas')[0].toDataURL("image/jpeg") );
        };
        this.set( 'file', file );
      },
      resetCanvas: function() {
        var context = this.get( 'canvasContext' );
        context.beginPath();
        context.rect( 0, 0, this.get('width'), this.get('height') );
        context.fillStyle = 'white';
        context.fill();
      },
      getNewDimensions: function( img ) {
        var
          width = img.width,
          height = img.height,
          maxWidth = this.get( 'width' ),
          maxHeight = this.get( 'height' );

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
        return { width: width, height: height };
      },
      drawImage: function( img ) {
        var
          width = this.get( 'width' ),
          height = this.get( 'height' ),
          resized = this.getNewDimensions( img );
        this.get('canvasContext').drawImage( img, ( width - resized.width ) / 2 , ( height - resized.height ) / 2, resized.width, resized.height );
      }
    });

    return CanvasFileComponent;
  });
define("ember-crud-example/controllers/photo/edit",
  [],
  function() {
    "use strict";
    var PhotoEditController = Ember.ObjectController.extend({
      needs: [ 'photo' ]
    });

    return PhotoEditController;
  });
define("ember-crud-example/controllers/photos",
  [],
  function() {
    "use strict";
    var PhotosController = Ember.ArrayController.extend({
      isNewOpen: null,
      contentBinding: 'storage.cache.photo'
    });

    return PhotosController;
  });
define("ember-crud-example/initializers/storage",
  ["ember-crud-example/utils/local-storage"],
  function(LocalStorage) {
    "use strict";

    var initializer = {
      name: "storageInjections",
      initialize: function( container, application ) {
        // register singleton instance of LocalStorage to be used whenever performing CRUD operations
        application.register( 'storage:main', LocalStorage );
        // register singleton instance cache object used for binding
        application.register( 'cache:main', Ember.Object );
        // inject storage into every route
        application.inject( 'route', 'storage', 'storage:main' );
        // inject cache into storage
        application.inject( 'storage:main', 'cache', 'cache:main' );
        // inject storage into all controllers
        application.inject( 'controller', 'storage', 'storage:main' );
      }
    };

    return initializer;
  });
define("ember-crud-example/models/index",
  ["ember-crud-example/app","ember-crud-example/utils/guid"],
  function(App, guid) {
    "use strict";

    /**
     * Ember.js models are just objects. 
     * I find it confusing that Ember.js refers to
     * models as models even though they're just objects. 
     * I'm defining the Model class to use as base for other models.
     */
    var Model = Ember.Object.extend( Ember.Copyable, {
      init: function() {
        if (Em.isNone(this.constructor.storageKey)) {
          throw new Error(Ember.String.fmt("%@ has to implement storageKey property or method", [this]));
        }
        if (Em.isNone(this.get('guid'))) {
          // guid is null when item is being created
          this.set( 'guid', guid() );
        }    
        this._super();
      },
      // default guid
      guid: null,
      copy: function() {
        return Em.run( this.constructor, 'create', this.serialize() );
      },
      serialize: function() {
        throw new Error(Ember.String.fmt("%@ has to implement serialize() method which is required to convert it to JSON.", [this]));
      }
    });

    // add a class property ( aka static property )
    Model.reopenClass({
      /**
       * String name of the storage key for this model.
       * This is only necessary because Ember has a bug that prevents proper class inspection when using modules
       * TODO: convert Model to a class and remove storageKey after Ember class inspection is fixed.
       */
      storageKey: null
    });

    return Model;
  });
define("ember-crud-example/models/photo",
  ["ember-crud-example/models/index"],
  function(Model) {
    "use strict";

    var Photo = Model.extend({
      image: null,
      title: '',
      description: '',
      // thumbnail is taken from placeholder.it or the image if 
      thumbnail: function() {
        if (Em.isNone(this.get('image'))) {
          return "http://placehold.it/75x75";
        } else {
          return this.get('image');
        }
      }.property( 'image' ),
      // Tells the resistance layer what properties to save to localStorage
      // Ember Data does this for you.
      serialize: function() {
        return this.getProperties([ "guid", "image", "title", "description" ]);
      }
    });

    // set storage key for this class of models
    Photo.reopenClass({
      storageKey: 'photo'
    });

    return Photo;
  });
define("ember-crud-example/routes",
  [],
  function() {
    "use strict";
    function Routes() {
      this.resource('photos', { path: '/photos' } , function(){
        this.route( 'new' );
      });
      this.resource('photo', { path: '/photo/:guid' }, function(){
        this.route( 'edit' );
      });
    }


    return Routes;
  });
define("ember-crud-example/routes/application",
  ["ember-crud-example/models/photo"],
  function(Photo) {
    "use strict";

    var ApplicationRoute = Ember.Route.extend({
      actions: {
        goToNewPhoto: function () {
          return this.transitionTo( 'photos.new' );
        },
        goToPhoto: function( model ) {
          return this.transitionTo( 'photo', model );
        },
        edit: function( model ) {
          return this.transitionTo( 'photo.edit', model.copy() );
        },
        create: function( model ) {
          this.storage.create( model );
          return this.goToPhotos();
        },
        update: function( model ) {
          this.storage.update( model );
          return this.goToPhotos();
        },
        remove: function( model ) {
          this.storage.remove( model );
        },
        cancel: function( model ) {
          Ember.destroy( model );
          this.storage.refresh(Photo);
          return this.goToPhotos();
        },
        /**
         * TODO: look into components events only pass 1 arument
         */
        didLoadFile: function( args ) {
          var
            src = args[ 0 ],
            model = args[ 1 ];
          model.set( 'image', src );
        }
      },
      goToPhotos: function() {
        this.controllerFor( 'photos' ).set( 'isNewOpen', false );
        return this.transitionTo( 'photos' );
      }
    });

    return ApplicationRoute;
  });
define("ember-crud-example/routes/index",
  [],
  function() {
    "use strict";
    var IndexRoute = Ember.Route.extend({
      beforeModel: function( transition ) {
        // redirect root to photos
        this.transitionTo( 'photos' );
      }
    });

    return IndexRoute;
  });
define("ember-crud-example/routes/photo",
  ["ember-crud-example/models/photo"],
  function(Photo) {
    "use strict";

    var PhotoRoute = Ember.Route.extend({
      model: function( params ) {
        return this.storage.find(Photo, params.guid);
      },
      serialize: function( params ) {
        return { guid: params.guid };
      }
    });

    return PhotoRoute;
  });
define("ember-crud-example/routes/photos",
  ["ember-crud-example/models/photo"],
  function(Photo) {
    "use strict";

    var PhotosRoute = Ember.Route.extend({
      model: function() {
        return this.storage.findAll(Photo);
      }
    });

    return PhotosRoute;
  });
define("ember-crud-example/routes/photos/new",
  ["ember-crud-example/models/photo"],
  function(Photo) {
    "use strict";

    var PhotosNewRoute = Ember.Route.extend({
      beforeModel: function() {
        this.controllerFor( 'photos' ).set( 'isNewOpen', true );
      },
      model: function() {
        return Photo.create({});
      },
      setupController: function( controller, model ) {
        controller.set( 'content', model );
      },
      actions: {
        willTransition: function( transition ) {
          if ( transition.targetName === 'photos.new' ) {
            // when transitioning to photos.new tell controller for this route that posts.new is open
            this.controllerFor( 'photos' ).set( 'isNewOpen', true );
          }
        }
      }
    });

    return PhotosNewRoute;
  });
define("ember-crud-example/utils/guid",
  [],
  function() {
    "use strict";
    /**
     * Generates a GUID string, according to RFC4122 standards.
     * @returns {String} The generated GUID.
     * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
     * @author Slavik Meltser (slavik@meltser.info).
     * @link http://slavik.meltser.info/?p=142
     * @link http://stackoverflow.com/a/16693578/172894
     */
    var guid = function() {
      function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
      }
      return _p8() + _p8(true) + _p8(true) + _p8();
    };

    return guid;
  });
define("ember-crud-example/utils/local-storage",
  ["ember-crud-example/app","ember-crud-example/utils/guid"],
  function(App, guid) {
    "use strict";
    /* global localStorage: false */


    var LocalStorage = Ember.Object.extend({
      getKey: function( type ) {
        return type.storageKey;
      },
      create: function( model ) {
        var type, existing;

        type = model.constructor;
        existing = this.findAll( type );
        existing.push( model );
        this.put( type, existing );
        return model;
      },
      read: function( type, guid ) {
        var all = this.findAll(type);
        return all.find(function(item) {
          return item.get( 'guid' ) === guid;
        });
      },
      update: function( model ) {
        var type, models, updated = false, updatedModels;

        type = model.constructor;
        models = this.findAll( type );
        updatedModels = models.map( function( item ) {
          if ( item.get('guid') === model.get('guid') ) {
            updated = true;
            return model;
          } else {
            return item;
          }
        });
        this.put( type, updatedModels );
        return updated;
      },
      remove: function( model ) {
        // TODO: this needs to be looked over
        var type, filtered = [], all = [], guid;
        type = model.constructor;
        if ( model ) {
          guid = model.get('guid');
          if ( guid ) {
            all = this.findAll( type );
            filtered = all.filter( function( item ) {
              return item.get('guid') !== guid;
            });
          }
          this.put( type, filtered );
        }
        return filtered.length !== all.length;
      },
      find: function( type, id ) {
        return Em.run( this, 'read', type, id );
      },
      findAll: function( type ) {
        return this.refresh( type );
      },
      put: function( type, models ) {
        var key, objects;

        key = this.getKey( type );
        Em.run(this.cache, 'set', key, models);
        objects = models.map(function(item){
          return item.serialize();
        });
        localStorage.setItem( key, JSON.stringify( objects ) );
      },
      refresh: function( type ) { 
        var  key, all, cacheObj;

        key = this.getKey(type);
        // cache property doesn't exist, let's create it
        if (Em.isNone(this.cache.get(key))) {
          // check if localStorage has an entry for this type
          cacheObj = Em.run(Em.Object, 'create', {});
          Em.run( this.cache, 'set', key, cacheObj );
        }
        if (localStorage.hasOwnProperty(key)) {
          // get all of the items for this type and convert JSON objects
          all = JSON.parse( localStorage.getItem( key ) );
          all = Em.A(all).map(function(item){
            return Em.run( type, 'create', item );
          });
        }
        Em.run(this.cache, 'set', key, all);
        all = this.cache.get(key);
        if ( typeof all === 'undefined' ) {
          all = [];
        }
        return all;
      }
    });

    return LocalStorage;
  });
//@ sourceMappingURL=app.js.map