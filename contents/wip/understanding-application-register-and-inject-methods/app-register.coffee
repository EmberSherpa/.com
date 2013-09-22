module.exports.description = """Example of cancelling transaction after failed validation""";

module.exports.html = """
"""

module.exports.code = `function() {

Ember.Application.initializer({
  name: "registerDependancies",
  initialize: function( container, application ) {
    // I'll be creating instances of App.person via App.__container__.lookup( 'person:App.Person' ) in the Tests
    // so I need to have it registerd with the container to be able to do so
    application.register( 'person:App.Person', App.Person, { singleton: false } );

    // there is only 1 planet Earth, so we need 1 instance of planet Earth to be created and no more
    // we can use default options: { instantiate: true, singleton: true }
    // when App.__container__.lookup( 'planet:main' ) called only 1 instance will be created
    application.register( 'planet:main', App.EarthPlanet );

    container.optionsForType( 'fruit', { singleton: false } );

    // everybody has the same sense of humor, so don't instantiate it
    application.register( 'humor:main', App.Humor, { instantiate: false } );

    // sarcasm is also same to everyone, so don't instantiate it
    application.register( 'humor:sarcastic', App.SarcasticHumor, { instantiate: false } );
  }
});

Ember.Application.initializer({
  name: "injectDependancies",
  after: "registerDependancies",
  initialize: function( container, application ) {
    // into every person, inject a property planet and set it to value returned by App.__container__.lookup( 'planet:main' )
    // this value should be singleton instance of EarthPlanet
    application.inject( 'person', 'planet', 'planet:main' );
    // inject favoriteFruit property into every person
    application.inject( 'person', 'favoriteFruit', 'fruit:favorite' );
    // inject hatedFruit property into every person
    application.inject( 'person', 'hatedFruit', 'fruit:hated' );
    // every person has a sense of humor
    application.inject( 'person', 'humor', 'humor:main' );
    // comedians have a sarcastic sense of humor
    application.inject( 'person:comedian', 'humor', 'humor:sarcastic' );
  }
});

var App = Ember.Application.create({});

App.Planet = Ember.Object.extend( { name: null } );
App.EarthPlanet = Ember.Object.extend({ name: 'Earth' });

App.Fruit = Ember.Object.extend({
  type: null
});

App.FavoriteFruit = App.Fruit.extend({
  tastes: "Yum :)"
});

App.HatedFruit = App.Fruit.extend({
  tastes: "Yuk :("
});

App.Person = Ember.Object.extend({
  name: null,
  joke: function() {
    // call class method on humor
    return this.get('humor').joke( this.get( 'hatedFruit' ), this.get('favoriteFruit' ) );
  }
});

App.ComedianPerson = App.Person.extend({});

App.Humor = Ember.Object.extend({});
App.Humor.reopenClass({
  joke: function( hatedFruit, lovedFruit ) {
    return "%@ and %@ don't mix!... he, he, he. Get it?".fmt( hatedFruit.get('type'), lovedFruit.get('type') );
  }
})

App.SarcasticHumor = Ember.Object.extend({});
App.SarcasticHumor.reopenClass({
  joke: function( hatedThing ) {
    return "I love %@... Not!".fmt( hatedThing );
  }
});
}
`

module.exports.tests = `function() {

App.rootElement = "#app";
App.setupForTesting();
App.injectTestHelpers();


module("Register & Inject", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
    App.reset();
  }
});

test( "There is only one Earth!", function() {
  expect( 1 );

  var container = App.__container__;

  var p1 = container.lookup( 'person:App.Person' );
  var before = container.lookup( 'planet:main' );
  var p2 = container.lookup( 'person:App.Person' );
  var after = container.lookup( 'planet:main' );

  equal( before, after, "singleton was not instantiated twice." );

});

test( "People tell jokes", function() {
  expect( 1 );

  var container = App.__container__;

  var person = container.lookup( 'person:App.Person' );

  person.set( "favoriteFruit.type", "apple" );
  person.set( "hatedFruit.type", "banana" );

  equal( "banana and apple don't mix!... he, he, he. Get it?", person.joke(), "old a lame joke" );
})

test( "People prefer different fruit", function() {
  expect( 3 );

  var p1, p2, f1, f2, v1, v2;

  var container = App.__container__;

  Ember.run(function(){
    p1 = container.lookup( 'person:App.Person' );
    p2 = container.lookup( 'person:App.Person' );

    p1.set( 'favoriteFruit.type', "apple" );
    p2.set( 'favoriteFruit.type', "banana" );

    f1 = p1.get( 'favoriteFruit' );
    f2 = p2.get( 'favoriteFruit' );

    v1 = p1.get( 'favoriteFruit.type' );
    v2 = p2.get( 'favoriteFruit.type' );
  });

  ok( p1 !== p2, "p1 and p2 are not the same person" );
  ok( f1 !== f2, "p1 and p2 have different instances of App.FavoriteFruit" );
  ok( v1 !== v2, "p1 and p2 have different favorite fruit" );

})

}
`