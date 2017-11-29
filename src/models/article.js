import Serializer from './../serializers/articleSerializer';
import AbstractModel from './abstractModel';
import Topic from './topic';

class Article extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.title = data.title;
		this.content = data.content;
		this.active = data.active;
		this.published = data.active;
		this['generate-post'] = data['generate-post'];
		this['generate-notification'] = data['generate-notification'];
	    this.topic = data.topic;
    }

    endpoint() {
    	return '/articles';
    }

    deconstruct(article) {
		return new Article({
			id: article.id,
			title: article.title,
			content: article.content,
			active: article.active,
			//relationships
			topic: article.topic,
		});
	}
};

export default Article;