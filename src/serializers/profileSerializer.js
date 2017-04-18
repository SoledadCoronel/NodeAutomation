import {Serializer, Deserializer} from 'jsonapi-serializer';
import Profile from './../models/profile';
import User from './../models/user';
//import GroupItem from './../models/groupItem';
//import Role from './../models/role';

class ProfileSerializer {

    constructor (config = {}) {
        this.serializer = new Serializer('profiles', {
            attributes: [
              'employee-id',
              'personal-phone',
              'personal-cellphone',
              'job-phone',
              'job-cellphone',
              'linkedin',
              'facebook',
              'twitter',
              'admission-date',
              'job-address',
              'personal-address',
              'document-type',
              'document',
              'gender',
              'birth-date',
              'personal-email',
              'marital-status',
              'job-type',
              'user'
            ],
            user: {
                ref: (profile, user) => user.id,
                attributes: ['name'],
                included: true
            }
        });

        this.deserializer = new Deserializer({
            users: {
                valueForRelationship: function (relationship) {
                    return new User({
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

export default ProfileSerializer;