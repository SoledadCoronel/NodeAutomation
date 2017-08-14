import Serializer from './../serializers/massiveActionsSerializer';
import AbstractModel from './abstractModel';


class MassiveActions extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.namespace = data.namespace;
		this.action = data.action;
		this.payload = JSON.stringify(data.payload);
		this.result = data.result;

    }

    endpoint() {
    	return '/massive-actions';
    }

    deconstruct(massiveActions) {
		return new MassiveActions({
			id: massiveActions.id,
			namespace: massiveActions.namespace,
			action: massiveActions.action,
			payload: massiveActions.payload,
			result: massiveActions.result,
		});
	}
};

export default MassiveActions;