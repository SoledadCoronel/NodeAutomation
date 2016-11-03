var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");

var should = chai.should();

chai.use(chaiHttp);
chai.use(chaiColors);


class PlatformFixture {

	constructor (data = {}) {
		this.references = {};
    }

    load (callback) {
    	var fixtureP = this;
		var random = new Random();

		var platform = 
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
		return chai.request('http://platform-ms.cd.gointegro.net')
		.post('/platforms')
		.send(platform)
		.then(function(res) {
			fixtureP.references['platformA'] = {
				'subdomain': res.body.data.attributes.subdomain, 
				'id': res.body.data.id
			};
			console.log(res.body);
			console.log(fixtureP.references['platformA']);

		});    	
    }

};
	
export default PlatformFixture;