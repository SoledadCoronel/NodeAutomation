import Serializer from './../serializers/massiveActionsSerializer';
import AbstractModel from './abstractModel';


class MassiveActions extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;
		this.id = data.id;
		this.namespace = data.namespace;
		this.action = data.action;
		this.payload = data.payload; // VER SI FUNCIONA ASI 
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
		});
	}
};

export default MassiveActions;