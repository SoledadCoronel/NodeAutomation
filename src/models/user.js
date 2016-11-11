class User {

	constructor (data = {}) {
		if (data.id) {
			this.id = data.id;
		}
		
    	this['name'] = data['name'];
	    this['last-name'] = data['last-name'];
	    this.email = data.email;
	    this.status = data.status;
	    this['login-enabled'] = data['login-enabled'];
	    this.role = data.role;

	    if (data.profile) {
	    	this.profile = data.profile;
	    }
    	
    	this['group-items'] = data['group-items'] || [];
    }

};

export default User;
