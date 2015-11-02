import Ember from 'ember';

const {
  inject
} = Ember;

export default Ember.Helper.extend({
  media: inject.service(),
  compute() {
    const media = this.get('media');
    if (media.get('isMobile')) {
      return 'mobile';
    }
    if (media.get('isTable')) {
      return 'sd';
    }
    return 'hd';
  }
});
