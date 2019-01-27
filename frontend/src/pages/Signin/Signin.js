import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { LoginForm } from "../../components/LoginForm";
import { checkDeviceLocaly } from "../../actions/device";
import "./Signin.css";

class Signin extends Component {
  state = {
    deviceId: ""
  };

  componentDidMount() {
    this.props.checkDeviceLocaly();
  }

  render() {
    const { device } = this.props;
    return (
      <div>
        {device ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="container signin">
            <LoginForm />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { device } = state;
  return {
    device
  };
}

export default connect(
  mapStateToProps,
  { checkDeviceLocaly }
)(Signin);
