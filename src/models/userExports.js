import Serializer from './../serializers/userExportsSerializer';
import AbstractModel from './abstractModel';
import Request from './../services/request';

class UserExports extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.info = data.info;

    }

    endpoint() {
    	return '/user-exports';
    }

    deconstruct(userExports) {
		return new UserExports({
			info: userExports.info
		});
	}
};

export default UserExports;