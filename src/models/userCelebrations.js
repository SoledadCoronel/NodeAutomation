import Serializer from './../serializers/userCelebrationsSerializer';
import AbstractModel from './abstractModel';
import Request from './../services/request';

class UserCelebrations extends AbstractModel {

	constructor (data = {}) {
		super();

		this.request = new Request('http://users-ms.cd.gointegro.net');
		this.serializer = new Serializer;
		this.info = data.info;

    }

    endpoint() {
    	return '/user-celebrations';
    }

    deconstruct(userCelebrations) {
		return new UserCelebrations({
			info: userCelebrations.info
		});
	}
};

export default UserCelebrations;