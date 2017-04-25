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

    deconstruct(widgetHire) {
    	return new WidgetHire({
    		id: widgetHire.id,
    		position: widgetHire.position,
    		status: widgetHire.status,
		});
    }
};

export default WidgetHire;