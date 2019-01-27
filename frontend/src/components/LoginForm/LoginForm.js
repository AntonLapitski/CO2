import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "../../components/Alert";
import { findDeviceById } from "../../actions/device";
import { updateLoginForm } from "../../actions/loginForm";

class LoginForm extends Component {
  state = {
    deviceId: ""
  };

  renderErrors = (errors = []) => {
    console.log({ errors });

    return errors.map((error, index) => (
      <Alert key={index} color={"danger"} text={`${error}`} />
    ));
  };

  handlerInputDeviceId = (e) => {
    const { value } = e.target;
    this.setState({
      deviceId: value
    });
    this.props.updateLoginForm({ value, errors: [] });
  };

  handlerSubmit = (e) => {
    e.preventDefault();
    const { deviceId } = this.state;
    this.props.findDeviceById(deviceId);
  };

  render() {
    const { deviceId } = this.state;
    const { isLoading, errors } = this.props.loginForm;
    const inpytStyle =
      errors.length === 0 ? "form-control" : "form-control  is-invalid";
    return (
      <form onSubmit={this.handlerSubmit} className="signin-form">
        <div className="signin-form__logo">
          <i className="fa fa-user-circle fa-4x" aria-hidden="true" />{" "}
        </div>
        {this.renderErrors(errors)}
        <div className="form-group">
          <label htmlFor="inputDeviceId">Entry device id:</label>
          <input
            id="inputDeviceId"
            name="deviceId"
            type="text"
            className={`${inpytStyle}`}
            aria-describedby="emailHelp"
            placeholder="Device id"
            maxLength="50"
            value={deviceId}
            onChange={this.handlerInputDeviceId}
          />
          <div className="invalid-feedback">
            Please provide a valid device Id
          </div>
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your data
          </small>
        </div>
        <button
          disabled={isLoading}
          className="btn btn-success col-12"
          type="submit"
        >
          Search device
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { loginForm } = state;
  return {
    loginForm
  };
}

export default connect(
  mapStateToProps,
  { findDeviceById, updateLoginForm }
)(LoginForm);
