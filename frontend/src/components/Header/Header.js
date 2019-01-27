import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetCurrentDevice } from "../../actions/device";

const Header = (props) => {
  return (
    <header>
      <Link to="/dashboard">
        <h2 className="logo">Dashboard</h2>
      </Link>
      <div className="notifications">
        <i className="fa fa-bell fa-lg" aria-hidden="true" />
        <span className="notifications_counter">12</span>
      </div>
      <div className="user-profile">
        <i className="fa fa-user-circle fa-2x" aria-hidden="true" />
        <div className="profile__menu">
          <div className="profile__menu-item">
            <Link to="/dashboard">
              <i className="fa fa-user fa-sm" aria-hidden="true" /> Profile
            </Link>
          </div>
          <hr className="profile__menu-hr" />
          <div className="profile__menu-item">
            <Link to="/notifications">
              <i className="fa fa-envelope" aria-hidden="true" /> Notifications{" "}
              <span className="badge badge-danger"> 12+</span>
            </Link>
          </div>
          <hr className="profile__menu-hr" />
          <div className="profile__menu-item">
            <label onClick={props.resetCurrentDevice}>
              <i className="fa fa-microchip fa-sm" aria-hidden="true" /> Change
              device id
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default connect(
  null,
  { resetCurrentDevice }
)(Header);
