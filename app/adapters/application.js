import EmberData from 'ember-data';
import investors from '.com/utils/mentors';
export default EmberData.JSONAPIAdapter.extend({
	model: function() {
		return mentors;
		}
});
