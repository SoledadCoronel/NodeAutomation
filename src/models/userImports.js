import Serializer from './../serializers/userImportSerializer';
import AbstractModel from './abstractModel';
import Request from './../services/request';

class UserImports extends AbstractModel {

	constructor (data = {}) {
		super();

		this.id = data.id;
		this.request = new Request('http://users-ms.cd.gointegro.net');
		this.serializer = new Serializer;
		this.create = JSON.stringify(data.create);
		this.payload = JSON.stringify(data.payload);

    }

    endpoint() {
    	return '/user-imports';
    }

    deconstruct(userImports) {
		return new UserImports({
			id: userImports.id,
			create: userImports.create,
			payload: userImports.payload
		});
	}
};

export default UserImports;