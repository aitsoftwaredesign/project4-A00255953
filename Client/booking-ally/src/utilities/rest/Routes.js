class Routes {

    static serverAddress = "";
    static venueExt = "/res/venue";
    static venueSearch = Routes.venueExt + "/find";
    static customerExt = "/res/customer";
    static partnerExt = "/res/partner";
    static login = "/auth/authenticate";
    static loginWithAccount = "/auth/authenticate?returnAccount=true";
    static register = "/auth/register";
    static tokenUser = "/auth/tokenuser";
    static uploadKey = "/auth/upload-key";

    static getAddress() {
        let href = window.location.origin;
        if((href.match(/:/g) || []).length === 1) {
            Routes.serverAddress = href.substr(0, href.length).concat(":", process.env.REACT_APP_SERVER_PORT, "/api");
        } else {
            Routes.serverAddress = href.slice(0, href.lastIndexOf(":")).concat(":", process.env.REACT_APP_SERVER_PORT, "/api");
        }

        return Routes.serverAddress;
    }
}

export default Routes;