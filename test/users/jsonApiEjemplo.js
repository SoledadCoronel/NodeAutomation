var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var users = [
  {
    id: 1,
    firstName: 'Adolfo',
    lastName: 'Castro',
    profile: 1,
    group: {
      id: 1,
      name: 'Grupo 1'
    },
    spaces: [1, 3]
  },
  {
    id: 2,
    firstName: 'Jaime',
    lastName: 'Frastai',
    profile: 2,
    group: {
      id: 2,
      name: 'Grupo 1'
    },
    spaces: [1]
  }
];
var UserSerializer = new JSONAPISerializer('users', {
  attributes: [
    'firstName',
    'lastName',
    'profile',
    'group',
    'spaces',
  ],
  profile: {
    ref: function (data, profileId) {
      return profileId;
    },
  },
  group: {
    ref: function (data, group) {
      return group.id;
    },
    attributes: ['name'],
    included: true
  },
  spaces: {
    ref: function (data, spaceId) {
      return spaceId;
    }
  }
});
var users = UserSerializer.serialize(users);
console.log(JSON.stringify(users, null, 2));