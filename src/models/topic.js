import Serializer from './../serializers/spaceSerializer';
import AbstractModel from './abstractModel';

class Topic extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.position = data.position;
		this.space = data.space
	}

	endpoint() {
		return '/topics';
	}

	deconstruct(topic) {
		return new Topic(topic);
	}
};

export default Topic;