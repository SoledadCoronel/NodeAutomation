import Serializer from './../serializers/contentItemSerializer';
import AbstractModel from './abstractModel';

class ContentItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
	    this.gallery = data.gallery;
	}

	endpoint() {
		return '/content-items';
	}

	deconstruct(contentItem) {
		return new ContentItem(contentItem);
	}
};

export default ContentItem;