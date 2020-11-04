class Routes {

    static serverAddress = "";
    static venueExt = "/venue";
    static partnerExt = "/partner";

    static getAddress() {
        let href = window.location.href;
        if(href.charAt(href.length-5) !== ':') {
            Routes.serverAddress = href.substr(0, href.length-1).concat(":", process.env.REACT_APP_SERVER_PORT);
        } else {
            Routes.serverAddress = href.substr(0, href.length-5).concat(":", process.env.REACT_APP_SERVER_PORT);
        }

        return Routes.serverAddress;
    }
}

export default Routes;