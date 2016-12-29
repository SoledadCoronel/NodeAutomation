import Serializer from './../serializers/spaceSerializer';
import AbstractModel from './abstractModel';

class Space extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.description = data.description;
		this.icon = data.icon;
		this.active = data.active;
		this['social-enabled'] = data['social-enabled'];
		this.position = data.position;
		this.visibility = data.visibility;
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];
	}

	endpoint() {
		return '/spaces';
	}

	deconstruct(space) {
		return new Space(space);
	}

	activate() {
		this.active = true;
		return this;
	}
};

export default Space;