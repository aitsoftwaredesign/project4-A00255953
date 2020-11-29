import Routes from "./Routes";

class RestClient {

    /**
     * Returns a list of all venues from the server
     * @param token - a string containing the jwt
     * @returns {Promise<List<Venues>>}
     */
    async getVenues() {
        const url = Routes.getAddress() + Routes.venueExt;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });

        return await response.json();
    }

    /**
     * Authenticate a users credentials to receive a JWT
     * @param credentials - an object containing the username and password
     * @returns {Promise<JWT>}
     */
    async authenticate(credentials) {
        const url = Routes.getAddress() + Routes.login;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        });

        return await response.json();
    }

    /**
     * Create a user account
     * @param user - an object containing the username and password
     * @returns {Promise<User>}
     */
    async register(user) {
        const url = Routes.getAddress() + Routes.register;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                id: null,
                username: user.username,
                password: user.password
            })
        });

        return await response.json();
    }

    /**
     * Get a given user account information
     * @param username - an object containing the username and password
     * @returns {Promise<User>}
     */
    async getUser(username) {
        const url = Routes.getAddress() + Routes.accountExt + '/' + username;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.getToken()
            }
        });

        return await response.json();
    }

    getToken() {
        return localStorage.getItem("token") || '';
    }
}

export default RestClient;