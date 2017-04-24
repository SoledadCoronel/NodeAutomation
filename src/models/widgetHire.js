import Serializer from './../serializers/widgetHireSerializer';
import AbstractModel from './abstractModel';

class WidgetHire extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this.position = data.position;
		this.status = data.status;
    }

    endpoint() {
    	return '/widget-hires';
    }

    deconstruct(widgetHires) {
    	return new WidgetHires({
    		id: widgetHires.id,
    		position: widgetHires.position,
    		status: widgetHires.status,
		});
    }
};

export default WidgetHires;