import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Customer/pages/Home/Home";
import PartnerHome from "./Partner/pages/PartnerHome/PartnerHome";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <div className="App" >
                  {/*Customer routes*/}
                  <Route exact path="/" >
                      <Home/>
                  </Route>
                  {/*Partner routes*/}
                  <Route exact path="/partner">
                        <PartnerHome/>
                  </Route>
              </div>
            </BrowserRouter>
    )
  }
}

export default App;
