import Serializer from './../serializers/widgetAnniversarySerializer';
import AbstractModel from './abstractModel';

class WidgetAnniversary extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this.position = data.position;
		this.status = data.status;
        this['automated-email'] = data['automated-email'];
        this['email-image-es'] = data['email-image-es'];
    }

    endpoint() {
    	return '/widget-anniversaries';
    }

    deconstruct(widgetAnniversary) {
    	return new WidgetAnniversary({
    		id: widgetAnniversary.id,
    		position: widgetAnniversary.position,
    		status: widgetAnniversary.status,
            'automated-email' : widgetAnniversary['automated-email'],
            'email-image-es' : widgetAnniversary['email-image-es'],
		});
    }
};

export default WidgetAnniversary;