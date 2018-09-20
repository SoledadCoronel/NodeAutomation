import Serializer from './../serializers/benefitSerializer';
import AbstractModel from './abstractModel';

class Benefits extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		
		this.item = data.item;
    }

    endpoint() {
    	return '/benefits';
    }

    deconstruct(contentItem) {
		return new ContentItem({
			id: contentItem.id,
			//relationships
			item: contentItem.item,
		});
	}
};

export default ContentItem;