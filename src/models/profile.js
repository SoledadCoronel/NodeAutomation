import Serializer from './../serializers/profileSerializer';
import AbstractModel from './abstractModel';

class Profile extends AbstractModel {

	constructor (data = {}) {
		super();
		this.serializer = new Serializer;

		this['employee-id'] = data['employee-id'];
		this['personal-phone'] = data['personal-phone'];
		this['personal-cellphone'] = data['personal-cellphone'];
		this['job-phone'] = data['job-phone'];
		this['job-cellphone'] = data['job-cellphone'];
		this.linkedin = data.linkedin;
		this.facebook = data.facebook;
		this.twitter = data.twitter;
		this['admission-date'] = data['admission-date'];
		this['job-address'] = data['job-address'];
		this['personal-address'] = data['personal-address'];
		this['document-type'] = data['document-type'];
		this.document = data.document;
		this.gender = data.gender;
		this['birth-date'] = data['birth-date'];
		this['personal-email'] = data['personal-email'];
		this['marital-status'] = data['marital-status'];
		this['job-type'] = data['job-type'];
		//relationships
		this.user = data.user;
		//this.supervisor = data.user || [];
		//this.image = data.image || [];
	}

	endpoint() {
		return '/profile';
	}

	deconstruct(profile) {
		return new Profile({
			'employee-id': profile['employee-id'],
			'personal-phone': profile['personal-phone'],
			'personal-cellphone': profile['personal-cellphone'],
			'job-phone': profile['job-phone'],
			'job-cellphone': profile['job-cellphone'],
			linkedin: profile.linkedin,
			facebook: profile.facebook,
			twitter: profile.twitter,
			'admission-date': profile['admission-date'],
			'job-address': profile['job-address'],
			'personal-address': profile['personal-address'],
			'document-type': profile['document-type'],
			document:  profile.document,
			gender:  profile.gender,
			'birth-date':  profile['birth-date'],
			'personal-email': profile['personal-email'],
			'marital-status': profile['marital-status'],
			'job-type': profile['job-type'],
		//relationships
			user: profile.user,
		});
	}

	/*activate() {
		this.active = true;
		return this;
	}*/
};

export default Profile;