import Serializer from './../serializers/roleSerializer';
import AbstractModel from './abstractModel';

class Role extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.status = data.status || 'active';
		this['is-admin'] = data['is-admin'];
		this['is-default'] = data['is-default'];
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];
	}

	endpoint() {
		return '/roles';
	}

	build() {
		return (role) => {
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
    	}
	}

	activate() {
		this.status = 'active';

		return this;
	}
	
}

export default Role;
