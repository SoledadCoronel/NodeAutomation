import Serializer from './../serializers/userSerializer';
import AbstractModel from './abstractModel';

class User extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		/*if (data.id) {
			this.id = data.id;
		}*/
		this.id = data.id;
    	this.name = data.name;
	    this['last-name'] = data['last-name'];
	    this.email = data.email;
	    this.status = data.status;
	    this['login-enabled'] = data['login-enabled'];
	    this.role = data.role;

	    /*if (data.profile) {
	    	this.profile = data.profile;
	    }*/
	    this.profile = data.profile || [];
    	
    	this['group-items'] = data['group-items'] || [];
    }

    endpoint() {
    	return '/users';
    }

    deconstruct(user) {
		// FIXME
		return new User(user);
	}
};

export default User;
