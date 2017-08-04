import Serializer from './../serializers/groupSerializer';
import AbstractModel from './abstractModel';

class Group extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.position = data.position;
	}

	endpoint() {
		return '/groups';
	}

	deconstruct(group) {
		return new Group(group);
	}

	activate() {
		this.active = true;
		return this;
	}
};

export default Group;