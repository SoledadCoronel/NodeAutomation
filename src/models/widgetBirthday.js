import Serializer from './../serializers/widgetBirthdaySerializer';
import AbstractModel from './abstractModel';

class WidgetBirthday extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this.position = data.position;
		this.status = data.status;
        this['automated-email'] = data['automated-email'];
        this['email-image-es'] = data['email-image-es'];
        this['email-image-en'] = data['email-image-en'];
        this['email-image-pt'] = data['email-image-pt'];
    }

    endpoint() {
    	return '/widget-birthdays';
    }

    deconstruct(widgetBirthday) {
    	return new WidgetBirthday({
    		id: widgetBirthday.id,
    		position: widgetBirthday.position,
    		status: widgetBirthday.status,
           'automated-email' : widgetBirthday['automated-email'],
           'email-image-es' : widgetBirthday['email-image-es'],
           'email-image-en' : widgetBirthday['email-image-en'],
           'email-image-pt' : widgetBirthday['email-image-pt'],
		});
    }
};

export default WidgetBirthday;