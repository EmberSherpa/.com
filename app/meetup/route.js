import Ember from 'ember';

const {
  inject,
  RSVP
} = Ember;

export default Ember.Route.extend({
  vimeo: inject.service(),
  model() {
    const vimeo = this.get('vimeo');
    return RSVP.hash({
      codeTalks: vimeo.getVideosFromAlbum('Code Talks'),
      addonVideos: vimeo.getVideosFromAlbum('Addon Videos')
    });
  }
});
