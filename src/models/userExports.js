import Serializer from './../serializers/userExportsSerializer';
import AbstractModel from './abstractModel';
import Request from './../services/request';

class UserExports extends AbstractModel {

	constructor (data = {}) {
		super();

    }

    endpoint() {
    	return '/user-exports';
    }

    deconstruct(userExports) {
		return new UserExports({
		});
	}
};

export default UserExports;