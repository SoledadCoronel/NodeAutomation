import Serializer from './../serializers/widgetBirthdaySerializer';
import AbstractModel from './abstractModel';

class WidgetBirthday extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this.position = data.position;
		this.status = data.status;
        // agregar atributo nuevo
    }

    endpoint() {
    	return '/widget-birthdays';
    }

    deconstruct(widgetBirthday) {
    	return new WidgetBirthday({
    		id: widgetBirthday.id,
    		position: widgetBirthday.position,
    		status: widgetBirthday.status,
            // agregar atributo nuevo
		});
    }
};

export default WidgetBirthday;