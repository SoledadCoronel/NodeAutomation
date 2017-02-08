import Serializer from './../serializers/fileSerializer';
import AbstractModel from './abstractModel';

class ContentItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
	}

	endpoint() {
		return '/content-items';
	}

	deconstruct(contentItem) {
		return new ContentItem(contentItem);
	}
};

export default ContentItem;