import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Home from "./Customer/pages/Home/Home";
import CustomerBookings from "./Customer/pages/CustomerBookings/CustomerBookings";
import PartnerHome from "./Partner/pages/PartnerHome/PartnerHome";
import PartnerLogin from "./Partner/pages/PartnerLogin/PartnerLogin";
import VenueBookings from "./Partner/pages/VenueBookings/VenueBookings";
import VenueMenu from "./Customer/pages/VenueMenu/VenueMenu";
import AccountTypes from "./Resources/AccountTypes";
import {connect} from "react-redux";

class App extends Component {

    state = {
        lastPath: ''
    }

    partnerLoggedIn() {
        return (this.props.token !== "" && this.props.accountType === AccountTypes.Partner);
    }

    customerLoggedIn() {
        return (this.props.token !== "" && this.props.accountType === AccountTypes.Customer);
    }

    render() {
        return (
            <BrowserRouter>
              <div className="App" >
                  {/*Customer routes*/}
                  <Route exact path="/" component={Home}/>
                  <Route exact path="/venue/:venue_id" component={VenueMenu}/>
                  <Route exact path="/bookings" >
                      {this.customerLoggedIn() ? <CustomerBookings/> :  <Redirect to="/"/>}
                  </Route>
                  {/*Partner routes*/}
                  <Route exact path="/partner/login">
                      {this.partnerLoggedIn() ? <Redirect to="/partner"/> : <PartnerLogin/>}
                  </Route>
                  <Route exact path="/partner">
                      {this.partnerLoggedIn() ? <PartnerHome/> : <Redirect to="/partner/login"/>}
                  </Route>
                  <Route exact path="/partner/:venue_id">
                      {this.partnerLoggedIn() ? <VenueBookings/> : <Redirect to="/partner/login"/>}
                  </Route>
              </div>
            </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        accountType: state.accountType,
        token: state.token
    }
}

export default connect(mapStateToProps) (App);
