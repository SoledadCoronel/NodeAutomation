import Serializer from './../serializers/userImportSerializer';
import AbstractModel from './abstractModel';
import Request from './../services/request';

class UserImports extends AbstractModel {

	constructor (data = {}) {
		super();

		this.request = new Request('http://users-ms.cd.gointegro.net');
		this.serializer = new Serializer;

		//this.id = data.id;
		//this.create = data.create;
		//this.payload = JSON.stringify(data.payload);

		this.data = {
			payload:JSON.stringify(data.payload),
			id: data.id,
			create: data.create
		};

    }

    // @todo ver la forma de que el serialize serialize unicamente
    // las propiedades necesarias y no toda la instancia. Fram Aguilar
 	create(params = {}) {
		return this.request.post(
			this.prepareUrl(this.endpoint(), params),
			this.getSerializer().serialize(this.data)
		).then(this.process());
	}

    endpoint() {
    	return '/user-imports';
    }

    deconstruct(userImports) {
		return new UserImports({
			id: userImports.id,
			create: userImports.create,
			payload: userImports.payload,
		});
	}
};

export default UserImports;