import {Serializer, Deserializer} from 'jsonapi-serializer';
import Gallery from './../models/gallery';
import File from './../models/file'


class GalleryItemSerializer {

  constructor (config = {}) {
    this.serializer = new Serializer('gallery', {
      attributes: [],
      gallery: {
        ref: (galleryItem, gallery) => gallery.id,
        attributes: ['name'],
        included: true
      },
      file: {
        ref: (galleryItem, file) => file.id,
        attributes: ['name'],
        included: true
      }
    });

    this.deserializer = new Deserializer({
      galleries: {
        valueForRelationship: function (relationship) {
          return new Gallery({
            id: relationship.id,
          });
        }
      },
      files: {
        valueForRelationship: function (relationship) {
          return new File({
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

export default GalleryItemSerializer;