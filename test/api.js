import User from './../src/models/user';
import Profile from './../src/models/profile';
import GroupItem from './../src/models/groupItem';
import Role from './../src/models/role';
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
    'first-name': 'Adolfo',
    'last-name': 'Castro',
    'email' : 'adolfo.castro@gointegro.com',
    'status' : 'active',
    'login-enabled' : false,
    role: new Role({
      id: 1,
      name: 'spaceAdmin'
    }),
    profile: new Profile({
      id: 1,
      name: 'El papa'
    }),
    'group-items': [defaultGroupItem, adminsGroupItem]
});

let user2 = new User({
    id: 2,
    'first-name': 'Jaime',
    'last-name': 'Frastai',
    'email' : 'jaime.frastai@gointegro.com',
    'status' : 'active',
    'login-enabled' : false,
    role: new Role({
      id: 2,
      name: 'basic'
    }),
    profile: new Profile({
      id: 2,
      name: 'Palta manager'
    }),
    'group-items': [defaultGroupItem]
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
              role: {
                data: {
                  type: 'roles',
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
