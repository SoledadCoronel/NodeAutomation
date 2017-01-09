//import Serializer from './../serializers/platformSerializer';
import AbstractModel from './abstractModel';
import Response from './../response';
import { session } from './../session';

class Platform extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

	}

	request(url, method = 'post', body = {}) {
		var body = 
		{
			"data": 
			[
			{
				"type": "platforms",
				"attributes": 
				{
					"name": "miPrimerTest"+random.integer(1, 10000),
					"subdomain": "miPrimerTest"+random.integer(1, 10000),
					"timezone": "America/Argentina/Buenos_Aires",
					"status": "active",
					"users-range": "0-50",
					"language": "es"
				}
			},
			{
				"type": "users",
				"attributes": 
				{
					"name": "Soledad",
					"last-name": "Coronel",
					"email": "soledad.coronel@gointegro.com",
					"password": "coquito25"
				}
			}
			]
		}
		return this.chai.request('http://platform-ms.cd.gointegro.net')
		[method](url)
		.set('content-type', 'application/vnd.api+json')
		.set('Accept', 'application/vnd.api+json')
		.send(body)
		.then((response) => {
			return new Response(response.statusCode, response.body);
		})
		.catch((error) => {
			return new Response(error.response.statusCode, null, error.response.body.errors);
		});
	}

	endpoint() {
		return '/platforms';
	}

	deconstruct(platform) {
		return new Platform(platform);
	}

	/*activate() {
		this.active = true;
		return this;
	}*/
};

export default Platform;