import Request from './../services/request';
import Collection from './collection';

class AbstractModel {

	constructor () {
		this.request = new Request;
	}

	create() {
		return this.request.post(
			this.endpoint(),
			this.getSerializer().serialize(this)
		).then(this.process());
	}

	update() {
		return this.request.patch(
			this.endpoint() + '/' + this.id,
			this.getSerializer().serialize(this)
		).then(this.process());
	}

	fetch(id) {
		return this.request.get(
			this.endpoint() + '/' + id
		)
		.then(this.process());
	}

	list(params={}) {
		return this.request.get(
			// FIXME exceeds max time
			this.endpoint() + '?page[size]=5'
		).then(this.process());
	}

	process() {
		return (body) => {
			if (body.errors) {
				this.errors = body.errors;
				return this;
			}

			return this.getSerializer()
				.deserialize(body)
				.then(this.build(body.meta));
        }
	}

	build(meta = {}) {
		return (object) => {
			return Array.isArray(object)
				? new Collection(object.map(this.deconstruct), meta)
				: this.deconstruct(object);
    	}
	}

	getSerializer() {
		return this.serializer;
	}
	
}

export default AbstractModel;
