import Serializer from './../serializers/userSerializer';
import AbstractModel from './abstractModel';

class User extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
    	this.name = data.name;
	    this['last-name'] = data['last-name'];
	    this.email = data.email;
	    this.status = data.status;
	    this['login-enabled'] = data['login-enabled'];
	    this['registered-date'] = data['registered-date'];
	    this['created-at'] = data['created-at'];
	    this['updated-at'] = data['updated-at'];
	    this.role = data.role;
	    this.profile = data.profile;
    	this['group-items'] = data['group-items'] || [];
    }

    endpoint() {
    	return '/users';
    }

    deconstruct(user) {
		return new User({
			id: user.id,
			name: user.name,
			'last-name': user['last-name'],
			email: user.email,
			status: user.status,
			'login-enabled': user['login-enabled'],
			'registered-date': user['registered-date'],
			'created-at': user['created-at'],
			'updated-at': user['updated-at'],
			//relationships
			role: user.role,
			profile: user.profile,
			'group-items': user['group-items'],
		});
	}
};

export default User;
