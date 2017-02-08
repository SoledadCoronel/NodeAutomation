import {Serializer, Deserializer} from 'jsonapi-serializer';

class ContentItemSerializer {

	constructor (config = {}) {
		this.serializer = new Serializer('content-items', {
			attributes: [
            'gallery'
            ],
            gallery: {
                ref: (contentItem, gallery) => gallery.id,
                attributes: ['name'],
                included: true
            }
        });

		this.deserializer = new Deserializer({
            gallery: {
                valueForRelationship: function (relationship) {
                  return new Gallery({
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

export default ContentItemSerializer;