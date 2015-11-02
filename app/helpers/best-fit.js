import Ember from 'ember';

export function bestFitHelper(params = [], hash = {}) {
  let [ images ] = params;
  let { width } = hash;

  return bestFit(images, width);
}

export function bestFit(images, width) {
  if (images && width) {
    return images.sortBy('width').find(function(item){
      return item.width > width;
    });
  }
}

export default Ember.Helper.helper(bestFitHelper);
