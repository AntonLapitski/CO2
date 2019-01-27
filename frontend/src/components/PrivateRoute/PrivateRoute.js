import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

function PrivateRoute(props) {
  const { component: Component, device, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) =>
        device ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function manStateToProps(state) {
  const { device } = state;
  return {
    device
  };
}

export default connect(
  manStateToProps,
  {}
)(PrivateRoute);
