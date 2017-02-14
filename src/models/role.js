import Serializer from './../serializers/roleSerializer';
import AbstractModel from './abstractModel';

class Role extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.status = data.status || 'active';
		this['is-admin'] = data['is-admin'] || false;
		this['is-default'] = data['is-default'];
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];
	}

	endpoint() {
		return '/roles';
	}

	deconstruct(role) {
		return new Role(role);
	}

	activate() {
		this.status = 'active';
		return this;
	}
	
}

export default Role;
