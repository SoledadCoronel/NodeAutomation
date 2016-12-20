import RoleSerializer from './../serializers/roleSerializer';
import Request from './../services/request';

class Role {

	constructor (data = {}) {
		this.id = data.id;
		this.name = data.name;
		this.status = data.status;
		this.serializer = new RoleSerializer;
		this.request = new Request;
	}

	endpoint() {
		return '/roles';
	}

	create(token) {
		return this.request.post(
			this.endpoint(),
			this.serializer.serialize(this),
			token
		)
		.then((body) => {			
			return this.serializer.deserialize(body).then((roles) => {
            	return JSON.stringify(roles);
        	});
        })
		.catch((x, y, z) => {
			console.log('Role CATCH');
			console.log(x);
			console.log(y);
			console.log(z);
		});
	}
	
}

export default Role;
