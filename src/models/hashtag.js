import Serializer from './../serializers/hashtagSerializer';
import AbstractModel from './abstractModel';

class Hashtag extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.name = data.name;
		this['created-at'] = data['created-at'];
    }

    endpoint() {
    	return '/hashtags';
    }

    deconstruct(hashtag) {
		return new Hashtag({
			id: hashtag.id,
			name: hashtag.name,
			'created-at': hashtag['created-at'],
		});
	}
};

export default Hashtag;