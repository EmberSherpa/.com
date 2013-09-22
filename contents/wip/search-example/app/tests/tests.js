define("appkit/tests/acceptance/search_test",
  ["appkit/routes/index","appkit/app"],
  function(Index, App) {
    "use strict";

    module("Acceptances - Index", {
      setup: function(){
        App.reset();
      }
    });

    test("index renders", function(){
      visit('/').then(function(){
        ok(exists("h2:contains('Search Example')"));
      });
    });

    test("search hello", function(){
      visit('/')
        .then(function(){
          return fillIn(".search input", "hello");
        })
        .then(function(){
          return click(".search button");
        })
        .then(function(){
          equal(find('.search .results li').length, 10);
        });
    });

    test("go direct", function(){
      visit('/search/hi')    
        .then(function(){
          equal($('.search .results li').length, 10);
        });
    });

    test("back to search page", function(){
      visit('/')
        .then(function(){
          return fillIn('.search input', 'hi');
        })
        .then(function(){
          return click('.search button');
        })
        .then(function(){
          // I want to go back
          return visit('/');
        })
        .then(function(){
          var keyword = find('.search input').val();
          equal(keyword, '');
          ok(!exists('.search .results'));
        });
    });
  });
//@ sourceMappingURL=tests.js.map