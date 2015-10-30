import Ember from 'ember';
import EmberAjax from 'ember-ajax/services/ajax';

const ALBUMS = {
  'Code Talks': 3607051,
  'Addon Videos': 3607049
};

const {
  inject
} = Ember;

const {
  isNone,
  RSVP
} = Ember;

export default EmberAjax.extend({
  headers: {
    'Authorization': 'bearer 90402f10da7cb0d8fc377d3e74f2ca35'
  },
  store: inject.service(),
  getVideosFromAlbum(name) {
    let store = this.get('store');
    let id = ALBUMS[name];
    if (isNone(id)) {
      return RSVP.reject(`${name} is not a valid album name.`);
    }
    let url = `https://api.vimeo.com/me/albums/${id}/videos`;
    return this.request(url).then(({data}) => {
      return data.map((hash)=>{
        return store.push(store.normalize('video', hash));
      });
    });
  }
});
