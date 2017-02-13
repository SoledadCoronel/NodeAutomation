import Serializer from './../serializers/feedItemSerializer';
import AbstractModel from './abstractModel';

class FeedItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.item = data.item;
    }

    endpoint() {
    	return '/feed-items';
    }

    deconstruct(feedItem) {
		return new FeedItem({
			id: feedItem.id,
			//relationships
			item: feedItem.item,
		});
	}
};

export default FeedItem;