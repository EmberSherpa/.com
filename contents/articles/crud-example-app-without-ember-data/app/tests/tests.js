define("ember-crud-example/tests/acceptance/index_test",
  ["ember-crud-example/app"],
  function(App) {
    "use strict";

    module("Acceptances - Index", {
      setup: function(){
        App.reset();
      }
    });

    test("index renders", function(){
      visit('/').then(function(){
        ok(exists(".btn.new:contains('New photo')"));
      });
    });

  });
define("ember-crud-example/tests/acceptance/photo_edit_test",
  ["ember-crud-example/app","ember-crud-example/models/photo"],
  function(App, Photo) {
    "use strict";
    /* global deletePhotos: false */


    var storage, model, guid;

    module("Acceptances - Photo Edit", {
      setup: function(){
        App.reset();
        storage = App.__container__.lookup('storage:main');
        model = Em.run( Photo, 'create', {
          title: "Work in progress",
          description: "This item is incomplete."
        });
        Em.run( storage, 'create', model );
      },
      teardown: function() {
        deletePhotos();
      }
    });

    test("required exist", function(){
      equal(Em.typeOf(storage), 'instance');
      equal(Em.typeOf(model), 'instance');
      equal(Em.typeOf(model.get('title')), 'string');
      ok( model.get('title') !== '' );
    });

    test("renders", function(){
      visit('/photo/%@/edit'.fmt(model.get('guid')))
        .then(function(){
          ok(find("#inputTitle").val() === 'Work in progress');
          ok(find("#textareaDescription").val() === "This item is incomplete.");
        });
    });

    test("discards", function(){
      guid = model.get('guid');

      visit('/photo/%@/edit'.fmt(model.get('guid')))
        .then(function(){
          equal(find('#inputTitle').val(), 'Work in progress');
        })
        .then(function(){
          return fillIn("#inputTitle", "Updated with non-sense");
        })
        .then(function(){
          return click("button:contains('Cancel')");
        })
        .then(function(){
          var stored = storage.find( Photo, guid );
          equal(Em.typeOf(stored), 'instance');
          equal(stored.get('title'), "Work in progress");
        }); 
    });

  });
define("ember-crud-example/tests/acceptance/photos_new_test",
  ["ember-crud-example/app"],
  function(App) {
    "use strict";
    /* global deletePhotos: false */


    module("Acceptances - Photos New", {
      setup: function(){
        App.reset();
      },
      teardown: function() {
        deletePhotos();
      }
    });

    test("renders", function(){
      visit('/photos/new').then(function(){
        ok(exists("legend:contains('New photo')"));
        ok(exists("button:contains('Create')"));
      });
    });

    test("creates", function(){

      var itemCount;

      visit('/')
        .then(function(){
          itemCount = find("tr").length;
        })
        .then(function(){
          return click("button:contains('New photo')");
        })
        .then(function(){
          return fillIn("#inputTitle", "Photo 1 Title");
        })
        .then(function(){
          return fillIn("#textareaDescription", "Photo 1 Description");
        })
        .then(function(){
          return click( "button:contains('Create')");
        })
        .then(function(){
          ok(exists("button:contains('New photo')"));
          equal( find('tr').length, itemCount + 1 );
        });

    });
  });
define("ember-crud-example/tests/acceptance/photos_test",
  ["ember-crud-example/app"],
  function(App) {
    "use strict";

    module("Acceptances - Photos", {
      setup: function(){
        App.reset();
      }
    });

    test("index renders", function(){
      visit('/photos').then(function(){
        ok(exists(".btn.new:contains('New photo')"));
      });
    });

  });
define("ember-crud-example/tests/unit/routes/index_test",
  ["ember-crud-example/routes/index","ember-crud-example/app"],
  function(Index, App) {
    "use strict";

    var route;

    module("Unit - IndexRoute", {
      setup: function(){
        route = App.__container__.lookup('route:index');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Ember.Route);
    });
  });
define("ember-crud-example/tests/unit/routes/photos/new_test",
  ["ember-crud-example/routes/photos/new","ember-crud-example/app","ember-crud-example/utils/local-storage"],
  function(New, App, LocalStorage) {
    "use strict";

    var route;

    module("Unit - PhotosNewRoute", {
      setup: function(){
        route = App.__container__.lookup('route:photos.new');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Ember.Route);
    });

    test("has storage", function() {
    	ok(route.storage);
    	ok(route.storage instanceof LocalStorage);
    });
  });
define("ember-crud-example/tests/unit/utils/local_storage_test",
  ["ember-crud-example/app","ember-crud-example/models/photo","ember-crud-example/utils/local-storage"],
  function(App, Photo, LocalStorage) {
    "use strict";
    /* global deletePhotos: false */


    var storage;

    module("Unit - LocalStorage", {
      setup: function(){
        storage = App.__container__.lookup('storage:main');
      },
      teardown: function() {
        deletePhotos();
      }
    });

    test("it exists", function(){
      ok(storage instanceof LocalStorage);
    });

    test("create photo", function() {
      var model, guid, found;

      model = Em.run(Photo, 'create', {
        title: "this is a test",
        description: "nice"
      });

      Em.run(storage, 'create', model);
      ok(!Em.isEmpty(model.get('guid')), "guid was created");
      guid = model.get('guid');
      found = storage.read( Photo, guid );

      ok( !Em.isEmpty(found) );
      equal( model.get('guid'), found.get('guid') );

    });

    test("update photo", function() {

      var model, updated, guid;

      model = Em.run(Photo, 'create', {
        'title': "To be updated"
      });
      guid = model.get('guid');
      storage.create(model);
      Em.run(model, 'set', 'title', "Updated");
      storage.update(model);
      updated = storage.find(Photo, guid);

      ok(updated);
      equal(updated.get('title'), 'Updated');

    });

    /**
     * I have not idea why this test is failing.
     */
    test("delete photo", function() {
      var m1, m2, all;

      m1 = Em.run(Photo, 'create', {
        title: "title 1",
        description: "description 1"
      });

      m2 = Em.run(Photo, 'create', {
        title: "title 2",
        description: "description 2"
      });

      Em.run(storage, 'create', m1);
      Em.run(storage, 'create', m2);
      Em.run(storage, 'remove', m2);

      all = storage.findAll( Photo );
      equal( all.length, 1 );

    });


  });
//@ sourceMappingURL=tests.js.map