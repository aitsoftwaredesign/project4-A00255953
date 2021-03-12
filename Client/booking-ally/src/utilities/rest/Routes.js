class Routes {

    static serverAddress = "";

    static resourceExt = "/res";
    static venueExt = Routes.resourceExt + "/venue";
    static venueSearch = Routes.venueExt + "/find";
    static serviceExt = Routes.resourceExt + "/service";
    static bookingExt = Routes.resourceExt + "/booking";

    static authExt = "/auth";
    static login = Routes.authExt + "/authenticate";
    static loginWithAccount = Routes.authExt + "/authenticate?returnAccount=true";
    static register = Routes.authExt + "/register";
    static tokenUser = Routes.authExt + "/tokenuser";
    static uploadKey = Routes.authExt + "/upload-key";

    static imageExt = "/image/service";

    static getAddress() {
        let href = window.location.origin;
        let port = Routes.getServerPort();
        if((href.match(/:/g) || []).length === 1) {
            Routes.serverAddress = href.substr(0, href.length).concat(":", port, "/api");
        } else {
            Routes.serverAddress = href.slice(0, href.lastIndexOf(":")).concat(":", port, "/api");
        }

        return Routes.serverAddress;
    }

    static getServerPort() {
        return window.location.hostname === "localhost" ?
            process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
            :
            process.env.REACT_APP_SERVER_PORT;
    }
}

export default Routes;