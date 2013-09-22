---
title: Ember Search Example App
template: article.jade
description: Learn how to write a search interface for your app
tags: []
---

<div class="btn-group mbl mtm"><a href="app/" class="btn btn-success">Try the app</a><a href="app/tests/" class="btn btn-info">Run tests</a><a class="btn btn-warning" href="https://github.com/taras/ember-search-example" target="_blank">GitHub</a></div>

### App

```
Ember.LOG_BINDINGS = true;

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_VIEW_LOOKUPS: true
});
```

### Routes

```
App.Router.map(function(){
  this.resource('search', {path: '/search'}, function(){
    this.route('results', {path: ':keyword'});
  });
})
```

#### IndexRoute

Transitions to search route.

```
App.IndexRoute = Ember.Route.extend({
  beforeModel: function(){
    this.transitionTo('search');
  }
});
```

#### SearchRoute

When *search* action is triggered, transitions to *search.results* and pass the keyword *keyword*.

```
App.SearchRoute = Ember.Route.extend({
  actions: {
    search: function(keyword) {
      this.transitionTo('search.results', keyword);
    }
  }
});
```

#### ResultsSearchRoute

Generate search results based on keyword passed in params. 

```
App.SearchResultsRoute = Ember.Route.extend({
  model: function(params) {
    // need to keep track of search keyword to set in the controller
    this.set('keyword', params.keyword);  
    return _.range(0, 10).map(function(number){
      return Em.Object.create({
        name: params.keyword + number.toString()
      });
    }); 
  },
  setupController: function( controller, models ) {
    // I have to setup content property manually because I'm overriding setupController
    controller.set('content', models);
    // set the keyword into SearchResultsController
    controller.set('keyword', this.get('keyword'));
  },
  deactivate: function() {
    // when leaving SearchResultsController, reset the keyword property
    this.set('controller.keyword', '');
  }
});
```

**model**: Take keyword from params and create an array of 10 Ember Objects.

<div class="dialog dialog-warning">I'm using <a href="http://underscorejs.org/">underscore.js</a> library for the _.range() function.</div>

### Controllers

#### SearchController

Setting default value of *keyword* property which is used by the template.

```
App.SearchController = Ember.Controller.extend({
  needs: 'searchResults', // need to get the 
  keywordBinding: 'controllers.searchResults.keyword'
});
```

[warning]I didn't test the path in *needs* and keywordBinding properties. It might be wrong. If its wrong, please leave a comment or fix it in GitHub.[/warning]

### Templates

#### search

* Show input field
* Bind the controller's *keyword* property to value of the input field
* Show search field with button that triggers search.
* When search is clicked, pass the value of *keyword* to the action listeners
* Nested Search Results template will be show in the {{outlet}}

```
{{view Ember.TextField valueBinding=keyword}}<button {{action 'search' keyword}}>Search</button>
{{outlet}}
```

#### search/results

Show name of each item in the controller

```
<ul>
{{#each}}
  <li>{{name}}</li>
{{/each}}
</ul>
```