import Serializer from './../serializers/anniversarySerializer';
import AbstractModel from './abstractModel';
import Greeting from './greeting';

class Anniversary extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this['event-date'] = data['event-date'];

		this.target = data.target;
		this.greeting = data.greeting;
    }

    endpoint() {
    	return '/anniversaries';
    }

    deconstruct(anniversaries) {
		return new Anniversary({
			id: anniversaries.id,
			'event-date': anniversaries['event-date'],
			//relationships
			target: anniversaries.target,
			greeting: anniversaries.greeting,
		});
	}
};

export default Anniversary;