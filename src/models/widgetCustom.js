import Serializer from './../serializers/widgetCustomSerializer';
import AbstractModel from './abstractModel';
import File from './file'

class WidgetCustom extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this.position = data.position;
		this.status = data.status;
		this.title = data.title;
		this['show-title'] = data['show-title'];
		this.link = data.link;
		//this['created-at'] = data['created-at'];
		//this['updated-at'] = data['updated-at'];
	    this.file = data.file;
    }

    endpoint() {
    	return '/widget-customs';
    }

    deconstruct(widgetCustom) {
		return new WidgetCustom({
			id: widgetCustom.id,
			position: widgetCustom.position,
			status: widgetCustom.status,
			title: widgetCustom.title,
			'show-title': widgetCustom['show-title'],
			link: widgetCustom.link,
			//'created-at': homeWidget['created-at'],
			//'updated-at': homeWidget['updated-at'],
			//relationships
			file: widgetCustom.file,
		});
	}
};

export default WidgetCustom;