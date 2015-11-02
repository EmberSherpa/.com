import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('global-ember-meetup', function() {
    this.route('video', {path: 'video/:id'}, function(){
      
    });
  });
  this.route('mentoring');
});

export default Router;
