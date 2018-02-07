import {Serializer, Deserializer} from 'jsonapi-serializer';


class WidgetItemSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('widget-items', {
      attributes: [
            'position',
            'status',
            'item'
      ],
      item: {
        ref: (widgetItems, item) => item.id,
        attributes: ['id', 'type'],
        included: true,
        typeForAttribute: function() {
          return 'widgetItems'
        }
      }
    });

    this.deserializer = new Deserializer({
      'widget-items': {
        valueForRelationship: function (relationship) {
          return new WidgetItem({
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
        if (data.item instanceof WidgetBirthday) {
          serialized.data.relationships.item.data.type = 'widget-birthdays';
        }
        if (data.item instanceof WidgetAnniversary) {
          serialized.data.relationships.item.data.type = 'widget-anniversaries';
        }
        if (data.item instanceof WidgetHire) {
          serialized.data.relationships.item.data.type = 'widget-hires';
        }
        if (data.item instanceof WidgetCustom) {
          serialized.data.relationships.item.data.type = 'widget-customs';
        }
        return serialized;

  }
    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
        });
  }
};

export default WidgetItemSerializer;