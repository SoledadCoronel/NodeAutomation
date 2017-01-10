import Serializer from './../serializers/oauthSerializer';
import AbstractModel from './abstractModel';
import Response from './../services/response';
import Chai from 'chai';

class Oauth extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.chai = Chai;

		this.client_id = data.client_id || 'xquxqcct2m80ocswgksskgcs04gokg4ccg8wosk4o8skc0gsw';
		this.client_secret = data.client_secret || 'xlqzn4qpq2o44g4kks8o40w0gkw004sck440osc0cso8g8844';
		this.grant_type = data.grant_type || 'password';
	}

	/*endpoint() {
		return '/oauth/token';
	}*/

	deconstruct(oauth) {
		return new Oauth(oauth);
	}

	login(data = {}) {

      	return this.chai.request('http://api.cd.gointegro.net')
			.post('/oauth/token')
			.set('content-type', 'application/x-www-form-urlencoded')
			.send({
				username: data.username,
				password: data.password,
				subdomain: data.subdomain,
				client_id: this.client_id,
				client_secret: this.client_secret,
				grant_type: this.grant_type,
			})
			.then((response) => {
				return new Response(response.statusCode, response.body);
			})
			.catch((error) => {
				return new Response(error.response.statusCode, null, error.response.body.errors);
			});
	}
};

export default Oauth;