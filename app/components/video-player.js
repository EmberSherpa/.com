import Ember from 'ember';
import {bestFit} from 'website/helpers/best-fit';

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    let sizes = this.get('video.pictures.sizes');
    let width = this.$().width();
    let nextUp = bestFit(sizes, width);
    let height = this.calculateProportionalHeight(nextUp, width);
    this.setProperties({ width, height });
  },
  calculateProportionalHeight(size, refWidth) {
    let {width, height} = size;
    let ratio = height / width;
    return refWidth * ratio;
  },
  actions: {
    ready(player) {
      // autoplay is not bound, only triggered when video is ready
      player.autoplay(this.get('autoplay'));
      player.controls(this.get('controls'));
    }
  }
});
