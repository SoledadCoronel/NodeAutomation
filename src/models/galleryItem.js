import Serializer from './../serializers/galleryItemSerializer';
import AbstractModel from './abstractModel';
import Gallery from './gallery';
import File from './file'

class GalleryItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
	    this.gallery = data.gallery;
	    this.file = data.file;
    }

    endpoint() {
    	return '/gallery-items';
    }

    deconstruct(galleryItem) {
		return new GalleryItem({

			//relationships
			gallery: galleryItem.gallery,
			file: galleryItem.file,
		});
	}
};

export default GalleryItem;