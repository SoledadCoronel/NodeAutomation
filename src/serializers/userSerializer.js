import {Serializer, Deserializer} from 'jsonapi-serializer';
import Role from './../models/role';
import User from './../models/user';

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
              'registered-date',
              'created-at',
              'updated-at',
              'role'
            ],
            role: {
                ref: (user, role) => role.id,
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
