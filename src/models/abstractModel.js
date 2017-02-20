import Request from './../services/request';
import Collection from './collection';

class AbstractModel {

	constructor (data = {}) {
		this.request = new Request;

		if (data.id) {
			this.id = data.id;
		}		
	}

	create(params = {}) {
		return this.request.post(
			this.prepareUrl(this.endpoint(), params),
			this.getSerializer().serialize(this)
		).then(this.process());
	}

	update() {
		return this.request.patch(
			this.endpoint() + '/' + this.id,
			this.getSerializer().serialize(this))
		.then(this.process());
	}

	delete(id) {
		return this.request.delete(
			this.endpoint() + '/' + this.id,
			this.getSerializer().serialize(this))
		.then(this.process());
	}
	
	fetch(id, params = {}) {
		return this.request.get(
			this.prepareUrl(this.endpoint() + '/' + id, params))
		.then(this.process());
	}

	list(params = {}) {
		return this.request.get(
			this.prepareCollectionUrl(this.endpoint(), params)
		).then(this.process());
	}

	prepareUrl(url, params = {}) {
		if (Array.isArray(params.include)) {
			url += '&include=' + params.include.join(',');
		}

		return url;
	}

	prepareCollectionUrl(url, params = {}) {
		let pageNumber = params.page && params.page.number ? params.page.number : 1;
		let pageSize = params.page && params.page.size ? params.page.size : 50;

		url += '?page[number]=' + pageNumber + '&page[size]=' + pageSize;

		if (params.filter) {
			Object.keys(params.filter).forEach(function (key) {
				url += '&filter[' + key + ']=' + params.filter[key];
			});
		}

		if (typeof params.query == 'string') {
			url += '&' + params.query;
		}

		return this.prepareUrl(url);
	}

	process() {
		return (response) => {
			if (response.hasErrors()) {
				return response;
			}

			if (response.getStatus() != 204) {
				return this.getSerializer()
					.deserialize(response.getContent())
					.then(this.build(response));				
				} else {
					return response;
				}

        }
	}

	build(response) {
		return (object) => {
			return response.withContent(
				Array.isArray(object)
					? new Collection(object.map(this.deconstruct), response.getMeta())
					: this.deconstruct(object)
			);
    	}
	}

	getSerializer() {
		return this.serializer;
	}
	
}

export default AbstractModel;
