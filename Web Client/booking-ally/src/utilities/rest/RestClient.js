import Routes from "./Routes";

class RestClient {

    async getVenues() {
        const url = Routes.getAddress() + Routes.venueExt;
        const response = await fetch(url);

        return await response.json();
    }
}

export default RestClient;