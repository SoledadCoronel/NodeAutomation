import Serializer from './../serializers/fileSerializer';
import AbstractModel from './abstractModel';

class File extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.prefix = data.prefix;
		this.file = data.file;
	}

	endpoint() {
		return '/files';
	}

	deconstruct(file) {
		return new File(file);
	}

	activate() {
		this.active = true;
		return this;
	}
};

export default File;