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
			this.prepareUrl(this.endpoint(), params)
		).then(this.process());
	}

	prepareUrl(url, params={}) {
		let pageNumber = params.page && params.page.number ? params.page.number : 1;
		let pageSize = params.page && params.page.size ? params.page.size : 50;

		url += '?page[number]=' + pageNumber + '&page[size]=' + pageSize;

		if (params.filter) {
			Object.keys(params.filter).forEach(function (key) {
				url += '&filter[' + key + ']=' + params.filter[key]
			});
		}

		if (Array.isArray(params.include)) {
			url += '&include=' + params.include.join(',');
		}

		if (typeof params.query == 'string') {
			url += '&' + params.query;
		}

		return url;
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
