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
                Accept: 'application/json'
            }
        });

        return await response.json();
    }

    /**
     * Returns a list of all venues from the server for the given partner id
     * @returns {Promise<List<Venues>>}
     */
    async getPartnersVenues(partner) {
        const url = Routes.getAddress() + Routes.venueExt + '/partner/' + partner ;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        return await response.json();
    }

    /**
     * Create a new venue using the given JSON object.
     * @param venue
     * @returns {Promise<any>}
     */
    async createVenue(venue) {
        const url = Routes.getAddress() + Routes.venueExt;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.getToken()
            },
            body: JSON.stringify(venue)
        });
        return response.json();
    }

    /**
     * Authenticate a users credentials to receive a JWT
     * @param credentials - an object containing the username and password
     * @param account - returns the user account object if true. Defaults to false.
     * @returns {Promise<JWT>}
     */
    async authenticate(credentials, account = false) {
        const url = Routes.getAddress() + (account ? Routes.loginWithAccount : Routes.login);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        });

        return await response.json();
    }

    /**
     * Create a customer account
     * @param user - an object containing the username and password
     * @returns {Promise<User>}
     */
    async registerCustomer(user) {
        const url = Routes.getAddress() + Routes.register + "/customer";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        });

        try {
            return await response.json();
        } catch (e) {
            return response;
        }
    }

    /**
     * Create a partner account
     * @param user - an object containing the username and password
     * @returns {Promise<User>}
     */
    async registerPartner(user) {
        const url = Routes.getAddress() + Routes.register + "/partner";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(user)
        });

        try {
            return await response.json();
        } catch (e) {
            return response;
        }
    }

    /**
     * Get a given user account information using the JWT token.
     * @returns {Promise<User>}
     */
    async getUser() {
        const url = Routes.getAddress() + Routes.tokenUser;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.getToken()
            }
        });
        let returnVal = response.status === 200 ? await response.json() : null;
        return returnVal;
    }

    getToken() {
        return localStorage.getItem("BAtoken") || '';
    }
}

export default RestClient;