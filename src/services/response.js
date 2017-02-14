import Chai from 'chai';
import Random from 'random-js';
import { session } from './session';

class Response {

	constructor(status, content, errors) {
		this.status = status;
		this.content = content;
		this.meta = content ? content.meta : {};
		this.errors = errors || [];
    }

    getStatus() {
    	return this.status;
	}

    getContent() {
    	return this.content;
	}

	withContent(content) {
		this.content = content;

		return this;
	}

	getMeta() {
		return this.meta;
	}

    getErrors() {
    	return this.errors;
	}

    hasErrors() {
    	return this.errors.length > 0;
	}

}

export default Response;
