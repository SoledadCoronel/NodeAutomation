import Serializer from './../serializers/userPreferencesSerializer';
import AbstractModel from './abstractModel';
import User from './user';

class UserPreferences extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.timezone = data.timezone;
		this.language = data.language;
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];

		this.user = data.user;

    }

    endpoint() {
    	return '/user-preferences';
    }

    deconstruct(userPreferences) {
		return new UserPreferences({
			id: userPreferences.id,
			timezone: userPreferences.timezone,
			language: userPreferences.language,
			'created-at': userPreferences['created-at'],
			'updated-at': userPreferences['updated-at'],

			//relationships
			user: userPreferences.user,
		});
	}
};

export default UserPreferences;