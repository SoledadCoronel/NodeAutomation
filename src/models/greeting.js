import Serializer from './../serializers/greetingSerializer';
import AbstractModel from './abstractModel';

class Greting extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this['greeting-type'] = data['greeting-type'];
		this.omit = data.omit;
		this['event-date'] = data['event-date'];
		this.target = data.target;
    }

    endpoint() {
    	return '/greetings';
    }

    deconstruct(greeting) {
		return new Greeting({
			id: greeting.id,
			'greeting-type': greeting['greeting-type'],
			omit: greeting.omit,
			'event-date': greeting['event-date'],
			//relationships
			target: greeting.target,
		});
	}
};

export default Greting;