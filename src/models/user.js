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
	    this.role = data.role;
	    this.profile = data.profile || [];
    	this['group-items'] = data['group-items'] || [];
    	this.role = data.role;
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
			//relationships
			role: user.role,
		});
	}
};

export default User;
