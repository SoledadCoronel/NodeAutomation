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
<<<<<<< HEAD
              'gender',
              'birth-date',
              'personal-email',
              'marital-status',
              'job-type',
              'user',
              'supervisor',
              'image',
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
            /*user: {
                ref: (profile, user) => user.id,
                attributes: ['name'],
                included: true
            }*/
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
=======
              'birth-date'
            ]
        });

        this.deserializer = new Deserializer({});
>>>>>>> test/refactoring
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