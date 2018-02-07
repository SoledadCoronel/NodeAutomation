import {Serializer, Deserializer} from 'jsonapi-serializer';
import Group from './../models/group';


class GroupItemSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('group-items', {
      attributes: [
      'name',
      'position',
      'group'
      ],
      group: {
        ref: (groupItem, group) => group.id,
        attributes: ['name'],
        included: true
      }
    });

    this.deserializer = new Deserializer({
      'group-items': {
        valueForRelationship: function (relationship) {
          return new GroupItem({
            id: relationship.id,
          });
        }
      }
    });
  }

    serialize (data = {}) {
        
        let serialized = this.serializer.serialize(data);
        if (!data.id) {
            delete serialized.data.id;
        }
        return serialized;
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
  }
};

export default GroupItemSerializer;