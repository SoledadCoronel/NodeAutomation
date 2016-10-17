import {Serializer, Deserializer} from 'jsonapi-serializer';
import Profile from './../models/profile';
import GroupItem from './../models/groupItem';

class UserSerializer {

    constructor (config = {}) {
        this.serializer = new Serializer('users', {
            attributes: [
                'firstName',
                'lastName',
                'profile',
                'groupItems',
            ],
            profile: {
                ref: (user, profile) => profile.id,
                attributes: ['name'],
                included: true
            },
            groupItems: {
                ref: (user, groupItem) => groupItem.id,
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
            }
        });
    }

    serialize (data = {}) {
        return this.serializer.serialize(data);
    }

    deserialize (data = {}) {
        return this.deserializer.deserialize(data, function (error, data) {
            //
        });
    }

};

export default UserSerializer;
