import Ember from 'ember';
import DS from 'ember-data';

const {
  decamelize,
  dasherize
} = Ember.String;

export default DS.JSONAPISerializer.extend({
  normalize: function(typeClass, payloadHash) {
    let [ id ] = payloadHash.uri.match(/([0-9]*)$/);
    let type = typeClass.modelName;

    let attributes = [];
    typeClass.eachAttribute(function(field) {
      let payloadField = decamelize(field);
      let expectedField = dasherize(field);
      attributes[expectedField] = payloadHash[payloadField];
    });

    return this._super(typeClass, { type, id, attributes });
 }
});
