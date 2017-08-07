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
var adminUserId = null;
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
    adminUserId = tokenInfo.user_id;
    
    fixtureData['adminToken'] = adminToken;
    fixtureData['adminUserId'] = adminUserId;

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

      return basicRole;
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
