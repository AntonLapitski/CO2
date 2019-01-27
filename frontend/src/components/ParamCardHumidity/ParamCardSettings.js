import React, { Component } from "react";

export class ParamCardSettings extends Component {
  render() {
    return (
      <div onClick={this.props.handleToggle} className="param-card__settings">
        <button className="btn btn-light btn-sm selected">g/m^3</button>
        <button className="btn btn-light btn-sm">%</button>
        <i className="fa fa-times ml-auto" aria-hidden="true" />
      </div>
    );
  }
}

export default ParamCardSettings;
