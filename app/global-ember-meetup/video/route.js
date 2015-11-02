import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Route.extend({
  vimeo: inject.service(),
  model(params) {
    let { id } = params;
    return this.get('vimeo').fetchVideo(id);
  }
});
