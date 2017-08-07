import Serializer from './../serializers/groupItemSerializer';
import AbstractModel from './abstractModel';

class GroupItem extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this.id = data.id;
		this.name = data.name;
		this.position = data.position;
		this.group = data.group;
	}

	endpoint() {
		return '/group-items';
	}

	deconstruct(groupItem) {
		return new GroupItem({
			id: groupItem.id,
			name: groupItem.name,
			position: groupItem.position,
			//relationships
			group: groupItem.group,
		});
	}
};

export default GroupItem;