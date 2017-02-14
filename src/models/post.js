import Serializer from './../serializers/postSerializer';
import AbstractModel from './abstractModel';

class Post extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.content = data.content;
		this.length = data.length;
		this['count-likes'] = data['count-likes'];
		this['count-comments'] = data['count-comments'];
		this['created-at'] = data['created-at'];
		this['last-activity'] = data['last-activity'];
		this.target = data.target;
    }

    endpoint() {
    	return '/posts';
    }

    deconstruct(post) {
		return new Post({
			id: post.id,
			content: post.content,
			length: post.length,
			'count-likes': post['count-likes'],
			'count-comments': post['count-comments'],
			'created-at': post['created-at'],
			'last-activity': post['last-activity'],
			//relationships
			target: post.target,
		});
	}
};

export default Post;