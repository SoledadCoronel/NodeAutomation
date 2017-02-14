import Serializer from './../serializers/contentItemSerializer';
import AbstractModel from './abstractModel';

class ContentItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		
		this.item = data.item;
    }

    endpoint() {
    	return '/content-items';
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