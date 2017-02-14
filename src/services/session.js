
class Session {

	constructor() {
		this.tokens = [];
		this.currentUser = null;
		this.currentToken = null;
    }

    addToken(userId, token, actAs = true) {
    	this.tokens[userId] = token;
    	if (actAs) {
    		this.actAs(userId);
    	}
    }

    actAs(userId) {
    	this.currentUser = userId;
    	this.currentToken = this.tokens[userId];
    }

    token() {
    	return this.currentToken;
    }

}

export let session = new Session;
