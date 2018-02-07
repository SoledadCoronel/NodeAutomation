import Serializer from './../serializers/gallerySerializer';
import AbstractModel from './abstractModel';
import Topic from './topic';

class Gallery extends AbstractModel {

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
    	return '/galleries';
    }

    deconstruct(gallery) {
		return new Gallery({
			id: gallery.id,
			title: gallery.title,
			content: gallery.content,
			active: gallery.active,
			published: gallery.published,
			'generate-post': gallery['generate-post'],
			'generate-notification': gallery['generate-notification'],

			//relationships
			topic: gallery.topic,
		});
	}
};

export default Gallery;