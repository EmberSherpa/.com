import Ember from 'ember';
import findWhere from 'lodash/collection/findWhere';

export function findWhereHelper(params, hash) {
  let [array] = params;

  return findWhere(array, hash);
}

export default Ember.Helper.helper(findWhereHelper);
