import Serializer from './../serializers/galleryItemSerializer';
import AbstractModel from './abstractModel';
import Gallery from './gallery';
import File from './file'

class GalleryItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		
		this.id = data.id,
		this['file-type'] = data['file-type'];
		this.position = data.position;
		this['created-at'] = data['created-at'];
		this['updated-at'] = data['updated-at'];

	    this.gallery = data.gallery;
	    this.file = data.file;
    }

    endpoint() {
    	return '/gallery-items';
    }

    deconstruct(galleryItem) {
		return new GalleryItem({
			id: galleryItem.id,
			'file-type': galleryItem['file-type'],
			position: galleryItem.position,
			'created-at': galleryItem['created-at'],
			'updated-at': galleryItem['updated-at'],
			//relationships
			gallery: galleryItem.gallery,
			file: galleryItem.file,
		});
	}

	changePosition() {
		this.position = 2;
		return this;
	}
};

export default GalleryItem;