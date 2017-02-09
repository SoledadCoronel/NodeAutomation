import Serializer from './../serializers/commentSerializer';
import AbstractModel from './abstractModel';

class Comment extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.comment = data.comment;
		this.length = data.length;
		this['count-likes'] = data['count-likes'];
		this['count-comments'] = data['count-comments'];
		this['created-at'] = data['created-at'];
		this['last-activity'] = data['last-activity'];
		this.subject = data.subject;
		this['reply-to'] = data['reply-to'];
    }

    endpoint() {
    	return '/comments';
    }

    deconstruct(comment) {
		return new Comment({
			id: comment.id,
			comment: comment.comment,
			length: comment.length,
			'count-likes': comment['count-likes'],
			'count-comments': comment['count-comments'],
			'created-at': comment['created-at'],
			'last-activity': comment['last-activity'],
			//relationships
			subject: comment.subject,
			'reply-to': comment['reply-to'],
		});
	}
};

export default Comment;