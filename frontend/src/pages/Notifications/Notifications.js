import React from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import "./Notifications.css";

function Notifications(props) {
  const data = new Date();
  return (
    <div className="container">
      <Header />
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <div className="notifications-container">
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
            >
              Temperature was upper norm! {`${data}`}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="alert alert-info alert-dismissible fade show"
              role="alert"
            >
              Temperature was upper norm! {`${data}`}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Temperature was upper norm! {`${data}`}
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
