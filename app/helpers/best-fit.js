import Ember from 'ember';

export function bestFit(params = [], hash = {}) {
  let [ images ] = params;
  let { width } = hash;

  if (images && width) {
    return images.sortBy('width').find(function(item){
      return item.width > width;
    });
  }
}

export default Ember.Helper.helper(bestFit);
