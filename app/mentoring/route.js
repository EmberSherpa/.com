import mentors from 'website/utils/mentors';

export default Ember.Route.extend({
	model() {
		return mentors;
	}
});