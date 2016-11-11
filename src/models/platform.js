class Platform {

	constructor (data = {}) {
		this.id = data.id;
		this.name = data.name;
		this.subdomain = data.subdomain;
		this.timezone = data.timezone;
		this.status = data.status;
		this.['users-range'] = data.['users-range'];
		this.language = data.language; 
	}
}