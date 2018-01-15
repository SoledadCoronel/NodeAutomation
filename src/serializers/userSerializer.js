import {Serializer, Deserializer} from 'jsonapi-serializer';
import Role from './../models/role';
import User from './../models/user';
import Profile from './../models/profile';
import UserPreferences from './../models/userPreferences';

class UserSerializer {

    constructor (config = {}) {
        this.serializer = new Serializer('users', {
            attributes: [
              'name',
              'last-name',
              'email',
              'status',
              'status-invitation',
              'login-enabled',
              'country',
              'registered-date',
              'created-at',
              'updated-at',
              'profile',
              'role',
              'preference'
            ],
            role: {
                ref: (user, role) => role.id,
                attributes: ['name'],
                included: true
            },
            profile: {
                ref: (user, profile) => profile.id,
                attributes: ['name'],
                included: true
            },
            preference: {
                ref: (user, preference) => preference.id,
                attributes: ['name'],
                included: true
            }
        });

        this.deserializer = new Deserializer({
            roles: {
                valueForRelationship: function (relationship) {
                    return new Role({
                        id: relationship.id,
                    });
                }
            },
            profiles: {
                valueForRelationship: function (relationship) {
                    return new Profile({
                        id: relationship.id,
                    });
                }
            },
            'user-preferences': {
                valueForRelationship: function (relationship) {
                    return new UserPreferences({
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
