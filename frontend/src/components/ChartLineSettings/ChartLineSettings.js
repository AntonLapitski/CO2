import React, { Component } from "react";
import { ColorPicker } from "../ColorPicker";

export class ChartLineSettings extends Component {
  iconStyles = {
    temperatyre: "fa fa-thermometer-half fa-lg ml-2",
    humidity: "fa fa-tint ml-2",
    CO2: "fa fa-cloud ml-2"
  };

  render() {
    const {
      colorDidChange,
      toggleChartVisible,
      isVisible,
      type,
      color
    } = this.props;

    return (
      <div className="ml-3 chart-settings__container">
        <div className="line_settings-color" style={{ background: color }}>
          <div className="color-picker none">
            <ColorPicker
              colorDidChange={(color) => colorDidChange(color, type)}
            />
          </div>
        </div>
        <span onClick={() => toggleChartVisible(type)}>
          {isVisible ? (
            <i className={this.iconStyles[`${type}`]} aria-hidden="true" />
          ) : (
            <i className="fa fa-eye-slash ml-2" aria-hidden="true" />
          )}
        </span>
      </div>
    );
  }
}

export default ChartLineSettings;
