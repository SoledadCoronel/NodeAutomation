import {Serializer, Deserializer} from 'jsonapi-serializer';


class WidgetBirthdaySerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('widget-birthday', {
      attributes: [
            'position',
            'status'
      ]
    });

    this.deserializer = new Deserializer({});
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
        });
  }
};

export default WidgetBirthdaySerializer;