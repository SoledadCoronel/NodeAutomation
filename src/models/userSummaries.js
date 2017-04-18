import Serializer from './../serializers/userSummariesSerializer';
import AbstractModel from './abstractModel';

class UserSummaries extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id;
        this.name = data.name,
        this['last-name'] = data['last-name'];
        this['job-title'] = data['job-title'];
        this.picture = data.picture;
        this.language = data.language;
        this.timezone = data.timezone;
        this['birth-date'] = data['birth-date'];
        this['admission-date'] = data['admission-date'];
    }

    endpoint() {
    	return '/user-summaries';
    }

    deconstruct(userSummaries) {
    	return new UserSummaries({
    		id: userSummaries.id,
    		name: userSummaries.name,
    		'last-name': userSummaries['last-name'],
            'job-title': userSummaries['job-title'],
            picture: userSummaries.picture,
            language: userSummaries.language,
            timezone: userSummaries.timezone,
            'birth-date': userSummaries['birth-date'],
            'admission-date': userSummaries['admission-date'],
		});
    }
};

export default UserSummaries;