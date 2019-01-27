import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Notifications } from "./pages/Notifications";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route exact path="/signin" component={Signin} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/notifications" component={Notifications} />
          <Route component={Signin} />
        </Switch>
      </Router>
    );
  }
}

export default App;
