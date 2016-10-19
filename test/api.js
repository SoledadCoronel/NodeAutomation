import User from './../src/models/user';
import Profile from './../src/models/profile';
import GroupItem from './../src/models/groupItem';
import UserSerializer from './../src/serializers/userSerializer';

let userSerializer = new UserSerializer();

let defaultGroupItem = new GroupItem({
    id: 1,
    name: 'Users'
});

let adminsGroupItem = new GroupItem({
    id: 2,
    name: 'Admins'
});

let user1 = new User({
    id: 1,
    firstName: 'Adolfo',
    lastName: 'Castro',
    profile: new Profile({
      id: 1,
      name: 'El papa'
    }),
    groupItems: [defaultGroupItem, adminsGroupItem]
});

let user2 = new User({
    id: 2,
    firstName: 'Jaime',
    lastName: 'Frastai',
    profile: new Profile({
      id: 2,
      name: 'Palta manager'
    }),
    groupItems: [defaultGroupItem]
});

let data = [user1, user2];

console.log(JSON.stringify(userSerializer.serialize(data), null, 2));

describe('test deserializer ', function() {

    it('tests example', function(done) {
        var jsonapi = {
          data: {
            type: 'users',
            id: '1',
            attributes: {
              'first-name': 'Soledad',
              'last-name': 'Coronel'
            },
            relationships: {
              profile: {
                data: {
                  type: 'profiles',
                  id: '1'
                }
              },
              groupItems: {
                data: [
                  {
                    type: 'group-items',
                    id: '1'
                  }
                ]
              }
            }
          }
        };

        userSerializer.deserialize(jsonapi).then( (users) => {
            console.log(JSON.stringify(users));
        });

        done();

    });
});
