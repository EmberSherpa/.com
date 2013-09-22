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

#### SearchResultsRoute

Generate search results based on keyword passed in params. 

```
App.SearchResultsRoute = Ember.Route.extend({
  model: function(params) {
    this.controllerFor('search').set('keyword', params.keyword);
    return _.range(0, 10).map(function(number){
      return Em.Object.create({
        name: params.keyword + number.toString()
      });
    }); 
  },
  deactivate: function() {
    this.controllerFor('search').set('keyword', '');
  }
});
```

**model**: Take keyword from params and create an array of 10 Ember Objects.

[warning]I'm using [underscore.js](http://underscorejs.org/) library for the _.range() function.[/warning]

### Controllers

#### SearchController

Setting default value of *keyword* property which is used by the template.

```
App.SearchController = Ember.Controller.extend({

});
```

[warning]**App.SearchController** has to be explicitely defined because **App.SearchResultsRoute** uses it in **mode** attribute. Without explicitely defining it, Ember throws error when accessing the **App.SearchResultsRoute** via url.[/warning]

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