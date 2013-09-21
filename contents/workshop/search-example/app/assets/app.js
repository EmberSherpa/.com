define("appkit/app",
  ["resolver","appkit/routes"],
  function(Resolver, routes) {
    "use strict";

    Ember.LOG_BINDINGS = true;

    var App = Ember.Application.create({
      LOG_ACTIVE_GENERATION: true,
      LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver
    });

    App.Router.map(routes); // TODO: just resolve the router


    return App;
  });
define("appkit/controllers/search",
  [],
  function() {
    "use strict";
    var SearchController = Ember.Controller.extend({
      keyword: ''
    });

    return SearchController;
  });
define("appkit/routes",
  [],
  function() {
    "use strict";
    function Routes() {
      this.resource('search', {path: '/search'}, function(){
        this.route('results', {path: ':keyword'});
      });
    }


    return Routes;
  });
define("appkit/routes/index",
  [],
  function() {
    "use strict";
    var IndexRoute = Ember.Route.extend({
      beforeModel: function(){
        this.transitionTo('search');
      }
    });


    return IndexRoute;
  });
define("appkit/routes/search",
  [],
  function() {
    "use strict";
    var SearchRoute = Ember.Route.extend({
      actions: {
        search: function(keyword) {
          this.transitionTo('search.results', keyword);
        }
      }
    });

    return SearchRoute;
  });
define("appkit/routes/search/results",
  [],
  function() {
    "use strict";
    var ResultsSearchRoute = Ember.Route.extend({

      model: function(params) {
        return _.range(0, 10).map(function(number){
          return Em.Object.create({
            name: params.keyword + number.toString()
          });
        }); 
      },
      serialize: function(keyword) {
        return {keyword: keyword};
      }

    });

    return ResultsSearchRoute;
  });
//@ sourceMappingURL=app.js.map