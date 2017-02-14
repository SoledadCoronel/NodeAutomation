import Serializer from './../serializers/topicSerializer';
import AbstractModel from './abstractModel';
import Space from './space';

class Topic extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.position = data.position;
	    this.space = data.space;
    }

    endpoint() {
    	return '/topics';
    }

    deconstruct(topic) {
		return new Topic({
			id: topic.id,
			name: topic.name,
			position: topic.position,
			//relationships
			space: topic.space,
		});
	}
};

export default Topic;