import {Serializer, Deserializer} from 'jsonapi-serializer';
import Profile from './../models/profile';
import User from './../models/user';

class ProfileSerializer {

    constructor (config = {}) {
        this.serializer = new Serializer('profiles', {
            attributes: [
              'admission-date',
              'document-type',
              'document',
              'birth-date'
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
            //
        });
    }

};

export default ProfileSerializer;