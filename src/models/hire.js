import Serializer from './../serializers/hireSerializer';
import AbstractModel from './abstractModel';
import Greeting from './greeting';

class Hire extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this['event-date'] = data['event-date'];

		this.target = data.target;
		this.greeting = data.greeting;
    }

    endpoint() {
    	return '/hires';
    }

    deconstruct(hire) {
		return new Hire({
			id: hire.id,
			'event-date': hire['event-date'],
			//relationships
			target: hire.target,
			greeting: hire.greeting,
		});
	}
};

export default Hire;