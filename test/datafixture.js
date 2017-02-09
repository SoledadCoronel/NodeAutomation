import Platform from '../src/models/platform';
import Oauth from '../src/models/oauth';
import Role from '../src/models/role';
import User from '../src/models/user';
import Invitation from '../src/models/invitation';
import { session } from './../src/services/session';


var jsonfile = require('jsonfile');

var chai = require('chai'), chaiColors = require('chai-colors');
var chaiHttp = require('chai-http');
var Random = require("random-js");
var random = new Random();
var should = chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiHttp);
chai.use(chaiColors);

var currentPlatform = null;
var adminToken = null;
var basicToken = null;
var adminSpaceToken = null;
var basicRole = null;
var adminSpaceRole = null;
var basicUser = null;
var adminSpaceUser = null;
var invitationBasicUser = null;
var invitationAdminSpaceUser = null;
var completeInvitationBasic = null;
var completeInvitationAdminSpace = null;

var fixtureData = {};

new Promise((resolve, reject) => {
  

  createPlatform()
  .then((currentPlatform) => {
    loginAdminUser(currentPlatform)
    .then((adminToken) => {
      session.addToken(1, adminToken);
      getPlatformRoles()
      .then((rolesInfo) => {
        createBasicUser(basicRole)
        .then((basicUser) => {
          createAdminSpaceUser(adminSpaceRole)
          .then((adminSpaceUser) => {
            inviteBasicUser(basicUser)
            .then((invitationBasicUser) => {
              inviteAdminSpaceUser(adminSpaceUser)
              .then((invitationAdminSpaceUser) => {
                completeBasicUserInvitation(invitationBasicUser)
                .then((completeInvitationBasic) => {
                  completeAdminSpaceUserInvitation(invitationAdminSpaceUser)
                  .then((completeInvitationAdminSpace) => {
                    loginBasicUser(currentPlatform, basicUser)
                    .then((basicToken) => {
                      loginAdminSpaceUser(currentPlatform, adminSpaceUser)
                      .then((adminSpaceToken) => {
                        let jsonFilePath = require('path').dirname(__dirname) + '/test/fixtures/data.json';

                        jsonfile.writeFile(jsonFilePath, fixtureData, {spaces: 2}, function() {
                          let jsonData = require(jsonFilePath);
                          //console.log(jsonData.basicUser);
                          //console.log(jsonData.adminSpaceUser);                          
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
})

function createPlatform() {
  let platform = new Platform({
    name: 'Platform' + random.integer(1, 10000),
    subdomain: 'subdomain' + random.integer(1, 10000)
  });

  return platform.create().then((response) => {
    let platformInfo = response.content;
    let currentPlatform = {'subdomain': platformInfo.subdomain, 'id': platformInfo.id};
    
    fixtureData['currentPlatform'] = currentPlatform;
    
    return currentPlatform;
  });
}

function loginAdminUser(currentPlatform) {
  return new Oauth().login({
    username: 'soledad.coronel@gointegro.com',
    password: 'myPassword',
    subdomain: currentPlatform.subdomain
  }).then((response) => {
    let tokenInfo = response.content;
    adminToken = tokenInfo.access_token;

    fixtureData['adminToken'] = adminToken;

    return adminToken;
  });
}

function getPlatformRoles() {
    
    return new Role()
    .list({
      page: {number: 1,size: 3},
      include: ['x', 'y']
    })
    .then((response) => {
      let rolesInfo = response.content;

      basicRole = rolesInfo.elements[1];
      adminSpaceRole = rolesInfo.elements[2];

      fixtureData['basicRole'] = basicRole.id;
      fixtureData['adminSpaceRole'] = adminSpaceRole.id;

      return {basicRole, adminSpaceRole};
    }); 
}

function createBasicUser(basicRole) {

      let user = new User({
      name: 'UsuarioRolBasico',
      'last-name': 'UsuarioRolBasico',
      email : 'basic' + random.integer(1, 10000) + '@gointegro.com',
      status : 'active',
      'login-enabled' : true,
      role: basicRole,
    });

    return user.create().then((response) => {
      let basicUserInfo = response.content;
      let basicUser = {'id': basicUserInfo.id, 'email': basicUserInfo.email};

      fixtureData['basicUser'] = basicUser;

    return basicUser;
    });
}

function createAdminSpaceUser(adminSpaceRole) {

  let user = new User({
    name: 'UsuarioRolAdminDeEspacio',
    'last-name': 'UsuarioRolAdminDeEspacio',
    email : 'adminSpace' + random.integer(1, 10000) + '@gointegro.com',
    status : 'active',
    'login-enabled' : true,
    role: adminSpaceRole,
  });

  return user.create().then((response) => {
      let adminUserInfo = response.content;
      let adminSpaceUser = {'id': adminUserInfo.id, 'email': adminUserInfo.email};

      fixtureData['adminSpaceUser'] = adminSpaceUser;

    return adminSpaceUser;
  });
}

function inviteBasicUser(basicUser) {

  let invitation = new Invitation({
    user: basicUser
  });

  return invitation.create().then((response) => {
    let invitationInfo = response.content;
    let invitationBasicUser = invitationInfo;

    fixtureData['invitationBasicUser'] = invitationBasicUser.id;

    return invitationBasicUser;
  });
}

function completeBasicUserInvitation(invitationBasicUser) {

    return invitationBasicUser
    .complete()
    .update()
    .then((response) => {
      let invitationInfo = response.content;
      let completeInvitationBasic = invitationInfo;

      fixtureData['completeInvitationBasic'] = completeInvitationBasic.id;

      return completeInvitationBasic;
    });
}

function inviteAdminSpaceUser(adminSpaceUser) {

  let invitation = new Invitation({
    user: adminSpaceUser
  });

  return invitation.create().then((response) => {
    let invitationInfo = response.content;
    let invitationAdminSpaceUser = invitationInfo;

    fixtureData['invitationAdminSpaceUser'] = invitationAdminSpaceUser.id;

    return invitationAdminSpaceUser;
  });
}

function completeAdminSpaceUserInvitation(invitationAdminSpaceUser) {

    return invitationAdminSpaceUser
    .complete()
    .update()
    .then((response) => {
      let invitationInfo = response.content;
      let completeInvitationAdminSpace = invitationInfo;

      fixtureData['completeInvitationAdminSpace'] = completeInvitationAdminSpace.id;

      return completeInvitationAdminSpace;
    });
}

function loginBasicUser(currentPlatform, basicUser) {

  return new Oauth().login({
    username: basicUser.email,
    password: 'myPassword',
    subdomain: currentPlatform.subdomain
  })
  .then((response) => {
    let tokenInfo = response.content;
    let basicToken = tokenInfo.access_token;

    fixtureData['basicToken'] = basicToken;

    return basicToken;
  });
}

function loginAdminSpaceUser(currentPlatform, adminSpaceUser) {

  return new Oauth().login({
    username: adminSpaceUser.email,
    password: 'myPassword',
    subdomain: currentPlatform.subdomain
  })
  .then((response) => {
    let tokenInfo = response.content;
    let adminSpaceToken = tokenInfo.access_token;

    fixtureData['adminSpaceToken'] = adminSpaceToken;

    return adminSpaceToken;
  });
}


/*  	let space = new Space({
  		name: 'espacio publico',
  		description: 'espacio publico',
  		icon: 'QA',
  		active: true,
  		'social-enabled': true,
  		position: 0,
  		visibility: 'public'
  	});

  	space.create()
  	.then((response) => {
  			response.should.have.status('201');
			expect(space.active).to.equal(true);
			space = response.content;
			publicSpace = space;
			done();
		});
  

  	let space = new Space({
  		name: 'espacio privado',
  		description: 'espacio privado',
  		icon: 'QA',
  		active: true,
  		'social-enabled': true,
  		position: 1,
  		visibility: 'private'
  	});

  	space.create()
  	.then((response) => {
  			response.should.have.status('201');
			expect(space.active).to.equal(true);
			space = response.content;
			privateSpace = space;
			done();
		});
  

  	let space = new Space({
  		name: 'espacio company',
  		description: 'espacio company',
  		icon: 'QA',
  		active: true,
  		'social-enabled': true,
  		position: 2,
  		visibility: 'company'
  	});

  	space.create()
  	.then((response) => {
  		  	response.should.have.status('201');
			expect(space.active).to.equal(true);
			space = response.content;
			companySpace = space;
			done();
		});
  
  	let file = new File({
  		prefix: 'gallery',
  		file: 'data:image/jpeg;base64,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'
  	});
	file.create()
	.then((response) => {
		response.should.have.status('201');
		done();
		});


  	let topic = new Topic({
  		name: 'topic01',
  		position: 0,
  		space: publicSpace,
  	});
	topic.create()
	.then((response) => {
		response.should.have.status('201');
		topic = response.content;
		currentTopic = topic;
		done();
		});
	*/