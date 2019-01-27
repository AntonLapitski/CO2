import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    const { color, text } = this.props;
    const { visible } = this.state;
    return (
      <div>
        {visible ? (
          <div
            className={`alert alert-${color} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{text}</strong>
            <button
              onClick={this.onDismiss}
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Alert;
