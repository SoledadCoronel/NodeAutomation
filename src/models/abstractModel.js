import Request from './../services/request';

class AbstractModel {

	constructor () {
		this.request = new Request;
	}

	create(token) {
		return this.request.post(this.endpoint(), this.getSerializer().serialize(this), token)
			.then((body) => {
				if (body.errors) {
					this.errors = body.errors;
					return this;
				}

				return this.getSerializer().deserialize(body).then(this.build());
	        });
	}

	update(token) {
		return this.request.patch(this.endpoint() + '/' + this.id, this.getSerializer().serialize(this), token)
			.then((body) => {
				if (body.errors) {
					this.errors = body.errors;
					return this;
				}

				return this.getSerializer().deserialize(body).then(this.build());
	        });
	}

	getSerializer() {
		return this.serializer;
	}
	
}

export default AbstractModel;
