class User {

	constructor (data = {}) {
		this.id = data.id;
    	this['first-name'] = data.firstName;
	    this['last-name'] = data.lastName;
	    this.email = data.email;
	    this.status = data.status;
	    this['login-enabled'] = data['login-enabled'];
	    this.role = data.role;
    	this.profile = data.profile;
    	this['group-items'] = data['group-items'] || [];
    }

};

export default User;
