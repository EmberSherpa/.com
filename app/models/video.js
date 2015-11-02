import EmberData from 'ember-data';

const {
  attr,
  Model
} = EmberData;

export default Model.extend({
  name: attr(),
  createdTime: attr('date'),
  description: attr(),
  duration: attr('number'),
  height: attr('number'),
  language: attr(),
  license: attr(),
  link: attr(),
  pictures: attr(),
  width: attr('number'),
  files: attr()
});
