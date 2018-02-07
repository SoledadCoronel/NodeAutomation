import Serializer from './../serializers/widgetItemSerializer';
import AbstractModel from './abstractModel';

class WidgetItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this.position = data.position;
		this.status = data.status;
        this.item = data.item;
    }

    endpoint() {
    	return '/widget-items';
    }

    deconstruct(widgetItem) {
    	return new WidgetItem({
    		id: widgetItem.id,
    		position: widgetItem.position,
    		status: widgetItem.status,
            //relationships
            item: widgetItem.item,
		});
    }
};

export default WidgetItem;