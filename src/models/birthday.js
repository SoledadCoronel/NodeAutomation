import Serializer from './../serializers/birthdaySerializer';
import AbstractModel from './abstractModel';
import Greeting from './greeting';

class Birthday extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this['event-date'] = data['event-date'];

		this.target = data.target;
		this.greeting = data.greeting;
    }

    endpoint() {
    	return '/birthdays';
    }

    deconstruct(birthday) {
		return new Birthday({
			id: birthday.id,
			'event-date': birthday['event-date'],
			//relationships
			target: birthday.target,
			greeting: birthday.greeting,
		});
	}
};

export default Birthday;