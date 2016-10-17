class User {

	constructor (data = {}) {
		this.id = data.id;
    	this.firstName = data.firstName;
	    this.lastName = data.lastName;
    	this.profile = data.profile;
    	this.groupItems = data.groupItems || [];
    }

};

export default User;
