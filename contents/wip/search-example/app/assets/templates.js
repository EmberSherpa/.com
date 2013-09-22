Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<h2>Search Example</h2>\n<div class=\"search\">\n{{outlet}}\n</div>\n");

Ember.TEMPLATES["search"] = Ember.Handlebars.compile("{{view Ember.TextField valueBinding=keyword}}<button {{action 'search' keyword}}>Search</button>\n{{outlet}}");

Ember.TEMPLATES["search/results"] = Ember.Handlebars.compile("<ul class=\"results\">\n{{#each}}\n  <li>{{name}}</li>\n{{/each}}\n</ul>\n");