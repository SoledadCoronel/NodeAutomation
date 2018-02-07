
class Session {

	constructor() {
		this.tokens = [];
		this.currentUser = null;
		this.currentToken = null;
        this.currentPlatform = null;
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

    setCredentials(userId, platformId) {
        this.currentUser = userId;
        this.currentPlatform = platformId;
    }

    getCredentials() {
        if (this.currentUser && this.currentPlatform) {
            return {'userId': this.currentUser, 'platformId': this.currentPlatform};
        }
        
    }

    destroySession() {
        if (this.currentUser && this.currentPlatform) {
            return {'userId': null, 'platformId': null};
        }
        else if(this.currentToken) {
            return {'token': null};
        }
    }

}

export let session = new Session;
