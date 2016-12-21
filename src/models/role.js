import Serializer from './../serializers/roleSerializer';
import Request from './../services/request';

class Role {

	constructor (data = {}) {
		this.id = data.id;
		this.name = data.name;
		this.status = data.status;
		this['is-admin'] = data['is-admin'];
		this['is-default'] = data['is-default'];
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];
		this.serializer = new Serializer;
		this.request = new Request;
	}

	endpoint() {
		return '/roles';
	}

	create(token) {
		return this.request.post(this.endpoint(), this.serializer.serialize(this), token)
			.then((body) => {
				if (body.errors) {
					let role = new Role();
					role.errors = body.errors;
					return role;
				}

				return this.serializer.deserialize(body).then((role) => {

					// FIXME
					return new Role(role);

					return new Role({
						id: role.id,
						name: role.name,
						status: role.status,
						'is-admin': role['is-admin'],
	        			'is-default': role['is-default'],
	        			'created-at': role['created-at'],
	        			'updated-at': role['updated-at'],
					});
	        	});
	        });
	}
	
}

export default Role;
