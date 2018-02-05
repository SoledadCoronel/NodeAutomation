import Serializer from './../serializers/likeSerializer';
import AbstractModel from './abstractModel';

class Like extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.subject = data.subject;
		}

    endpoint() {
    	return '/likes';
    }

    deconstruct(like) {
		return new Like({
			id: like.id,
			subject: like.subject,
		});
	}
};

export default Like;