import {Serializer, Deserializer} from 'jsonapi-serializer';
//import Profile from './../models/profile';
//import GroupItem from './../models/groupItem';
//import Role from './../models/role';

class ProfileSerializer {

    constructor (config = {}) {
        this.serializer = new Serializer('profile', {
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
              'job-type'
            ],
           /* supervisor: {
                ref: (user, profile) => profile.id,
                attributes: ['name'],
                included: true
            },
              image: {
                ref: (file, profile) => file.id,
                attributes: ['prefix'],
                included: true
            },*/
            user: {
                ref: (user, profile) => profile.id,
                attributes: ['employee-id'],
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
            },
            supervisors: {
                valueForRelationship: function (relationship) {
                    return new User({
                        id: relationship.id,
                    });
                }
            },
            image: {
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

export default UserSerializer;