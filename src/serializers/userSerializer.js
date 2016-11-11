import {Serializer, Deserializer} from 'jsonapi-serializer';
import Profile from './../models/profile';
import GroupItem from './../models/groupItem';
import Role from './../models/role';

class UserSerializer {

    constructor (config = {}) {
        this.serializer = new Serializer('users', {
            attributes: [
                'name',
                'last-name',
                'email',
                'status',
                'login-enabled',
                'role',
                'profile',
                'group-items',
            ],
           /* profile: {
                ref: (user, profile) => profile.id,
                attributes: ['name'],
                included: true
            },
            'group-items': {
                ref: (user, groupItem) => groupItem.id,
                attributes: ['name'],
                included: true
            },*/
            role: {
                ref: (user, role) => role.id,
                attributes: ['name'],
                included: true
            }
        });

        this.deserializer = new Deserializer({
            profiles: {
                valueForRelationship: function (relationship) {
                    return new Profile({
                        id: relationship.id,
                    });
                }
            },
            'group-items': {
                valueForRelationship: function (relationship) {
                    return new GroupItem({
                        id: relationship.id,
                    });
                }
            },
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
