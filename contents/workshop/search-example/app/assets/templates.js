Ember.TEMPLATES["application"] = Ember.Handlebars.compile("<h2>Search Example</h2>\n\n{{outlet}}\n");

Ember.TEMPLATES["search"] = Ember.Handlebars.compile("{{view Ember.TextField valueBinding=keyword}}<button {{action 'search' keyword}}>Search</button>\n{{outlet}}");

Ember.TEMPLATES["search/results"] = Ember.Handlebars.compile("<ul>\n{{#each}}\n  <li>{{name}}</li>\n{{/each}}\n</ul>\n");