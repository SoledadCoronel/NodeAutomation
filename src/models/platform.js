/*class Platform {

	constructor (data = {}) {
		this.id = data.id;
		this.name = data.name;
		this.subdomain = data.subdomain;
		this.timezone = data.timezone;
		this.status = data.status;
		this['users-range'] = data['users-range'];
		this.language = data.language; 
		this.user = data.user; // VER CON FRAN NO SE ENVIA COMO RELATIONSHIP
	}

	endopoint() {

		return '/platforms';
	}

	deconstructor(platform) {

		return new Platform({
			id: platform.id,
			name: platform.name,
			subdomain: platform.subdomain,
			timezone: platform.timezone,
			status: platfom.status,
			'users-range': platform.'users-range',
			language: platform.language,
			// VER CON FRAN COMO VIENE EL USER
		}); 
	}

	activate() {

		this.status = 'active';
	}

	inactivate() {

		this.status = 'disabled'
	}

	changeLanguage() {

		this.language = 'en';
	}
}*/