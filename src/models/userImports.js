import Serializer from './../serializers/userImportSerializer';
import AbstractModel from './abstractModel';

class UserImports extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.first_name = data.first_name;
		this.last_name = data.last_name;
		this.email = data.email; 
		this.supervisor_email = data.supervisor_email; 
		this.birthdate = data.birthdate;
		this.groups = data.groups;
    }

    endpoint() {
    	return '/user-imports';
    }

    deconstruct(userImports) {
		return new UserImports({
			id: userImports.id,
			first_name: userImports.first_name,
			last_name: userImports.last_name,
			email: userImports.email,
			supervisor_email: userImports.supervisor_email,
			birthdate: userImports.birthdate,
			groups: userImports.groups,
		});
	}
};

export default UserImports;