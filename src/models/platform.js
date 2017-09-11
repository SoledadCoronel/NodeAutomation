import Serializer from './../serializers/platformSerializer';
import AbstractModel from './abstractModel';
import Response from './../services/response';
import Chai from 'chai';

class Platform extends AbstractModel {

	constructor (data = {}) {
		super(data);
		this.serializer = new Serializer;
		this.chai = Chai;

		this.name = data.name;
		this.subdomain = data.subdomain;
		this.timezone = data.timezone || 'America/Argentina/Buenos_Aires';
		this.status = data.status || 'active';
		this['users-range'] = data['users-range'] || '0-50';
		this.country = data.country || 'ARG';
		this.language = data.language || 'es';

	}

	deconstruct(platform) {
		return new Platform(platform);
	}

	create(userData = {}) {
		var body = {
			"data": [
				{
					"type": "platforms",
					"attributes": 
					{
						"name": this.name,
						"subdomain": this.subdomain,
						"timezone": this.timezone,
						"status": this.status,
						"users-range": this['users-range'],
						"country": this.country,
						"language": this.language
					}
				},
				{
					"type": "users",
					"attributes": 
					{
						"name": userData.name || 'Soledad',
						"last-name": userData['last-name'] || 'Coronel',
						"email": userData.email || 'soledad.coronel@gointegro.com',
						"password": userData.password || 'myPassword'
					}
				}
			]
		}

		return this.chai.request('http://platform-ms.cd.gointegro.net')
			.post('/platforms')
			.set('content-type', 'application/vnd.api+json')
			.set('Accept', 'application/vnd.api+json')
			.send(body)
			.then((response) => {
				let r = new Response(response.statusCode, response.body);

				return this.getSerializer()
					.deserialize(r.getContent())
					.then(this.build(r));
			})
			.catch((error) => {
				return new Response(error.response.statusCode, null, error.response.body.errors);
			});
	}
};

export default Platform;