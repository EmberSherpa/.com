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

const host = 'https://api.vimeo.com';

export default EmberAjax.extend({
  headers: {
    'Authorization': 'bearer 90402f10da7cb0d8fc377d3e74f2ca35'
  },
  store: inject.service(),
  fetchVideosFromAlbum(name) {
    let id = ALBUMS[name];
    if (isNone(id)) {
      return RSVP.reject(`${name} is not a valid album name.`);
    }
    let url = `${host}/albums/${id}/videos`;
    return this.request(url).then(({data}) => {
      return data.map(this._pushVideo.bind(this));
    });
  },
  fetchVideo(id) {
    if (isNone(id)) {
      return RSVP.reject('video id was not specified');
    }
    let url = `${host}/videos/${id}`;
    return this.request(url).then(this._pushVideo.bind(this));
  },
  _pushVideo(data) {
    let store = this.get('store');
    return store.push(store.normalize('video', data));
  }
});
