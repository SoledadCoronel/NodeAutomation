import Serializer from './../serializers/groupSerializer';
import AbstractModel from './abstractModel';

class Group extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.position = data.position;
	}

	endpoint() {
		return '/groups';
	}

	deconstruct(group) {
		return new Group({
			id: group.id,
			name: group.name,
			position: group.position,
		});
	}
};

export default Group;