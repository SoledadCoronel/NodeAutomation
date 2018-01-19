import Serializer from './../serializers/userCelebrationsSerializer';
import AbstractModel from './abstractModel';
import Request from './../services/request';

class UserCelebrations extends AbstractModel {

	constructor (data = {}) {
		super();

		this.request = new Request('http://users-ms.cd.gointegro.net');
		this.serializer = new Serializer;
		this.id = data.id;
		this.name = data.name;
		this['last-name'] = data['last-name'];
		this['job-title'] = data['last-name'];
		this.picture = data.picture;
		this.language = data.language;
		this.timezone = data.timezone; 
		this.email = data.email; 
		this['platform-id'] = data['platform-id'];
		this['birth-date'] = data['birth-date'];
		this['admission-date'] = data['admission-date'];
		this['registration-date'] = data['registration-date'];
    }

    endpoint() {
    	return '/user-celebrations';
    }

    deconstruct(userCelebrations) {
		return new UserCelebrations({
			id: userCelebrations.id,
			name: userCelebrations.name,
			'last-name': userCelebrations['last-name'],
			'job-title' : userCelebrations['job-title'],
			picture: userCelebrations.picture,
			language: userCelebrations.language,
			timezone: userCelebrations.timezone,
			email: userCelebrations.email,
			'platform-id': userCelebrations['platform-id'],
			'birth-date' : userCelebrations['birth-date'],
			'admission-date': userCelebrations['admission-date'],
			'registration-date': userCelebrations['registration-date'],
		});
	}
};

export default UserCelebrations;