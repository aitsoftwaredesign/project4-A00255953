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
     * Sends the criteria to search for a given venue(s)
     * @package criteria - the search criteria
     * @returns {Promise<List<Venues>>}
     */
    async searchVenues(criteria) {
        const url = Routes.getAddress() + Routes.venueSearch;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(criteria)
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
     * Delete the given venue and all related services and images.
     * @param venue
     * @returns {Promise<any>}
     */
    async deleteVenue(venue) {
        const url = Routes.getAddress() + Routes.venueExt;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + this.getToken()
            },
            body: JSON.stringify(venue)
        });
        return response;
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
     * @param partner - is the new user a customer or partner
     * @returns {Promise<User>}
     */
    async registerUser(user, partner = false) {
        const url = Routes.getAddress() + Routes.register + (!partner) ? "/customer" : "/partner";
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

    /**
     * Uploads an image to the image management service for persisting to the storage service
     * @param image - the image to be uploaded
     * @returns {Promise<any>}
     */
    async uploadImage(image) {
        const url = Routes.getAddress() + Routes.imageExt;
        const formData = new FormData();
        formData.append("file", image);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.getToken()
            },
            body: formData
        });
        return response.json();
    }

    /**
     * Deletes the image by the given name.
     * @param image - the url of the image to be deleted
     * @returns {Promise<Response>}
     */
    async deleteImage(image) {
        image = image.split(".com")[1];
        const url = Routes.getAddress() + Routes.imageExt;
        const response = await fetch(url, {
            method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + this.getToken()
                },
                body: JSON.stringify({
                    image: image
                })
        });
        return response
    }

    /**
     * Persists the given service in the database for an existing venue.
     * @param service
     * @returns {Promise<any>}
     */
    async createService(service) {
        const url = Routes.getAddress() + Routes.serviceExt;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.getToken()
            },
            body: JSON.stringify(service)
        });
        return response.json();
    }

    /**
     * Get the services for the given venue by the given venue Id
     * @param venueId - the venue id of the services to find
     * @returns {Promise<any>}
     */
    async getServicesByVenueId(venueId) {
        const url = Routes.getAddress() + Routes.serviceExt + "/venue/" + venueId;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + this.getToken()
            }
        });

        return await response.json();
    }



}

export default RestClient;