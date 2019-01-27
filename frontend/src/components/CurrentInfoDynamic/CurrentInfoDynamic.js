import React, { Component } from "react";

export class CurrentInfoDynamic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      arrowStyle: ""
    };
  }

  componentDidMount() {
    const processedData = this.processingData();
    this.updateCurrentDynamic(processedData);
  }

  processingData = () => {
    const { data } = this.props;
    const processedData = {
      currentValue: "0",
      value: "N/A",
      arrowStyle: ""
    };

    const lastValue = data[data.length - 1];
    const prevValue = data[data.length - 2];
    const different = lastValue - prevValue;

    processedData.currentValue = `${lastValue}`;
    if (different > 0) {
      processedData.value = ` +${different}`;
      processedData.arrowStyle = "fa fa-arrow-up";
    } else if (different < 0) {
      processedData.value = ` ${different}`;
      processedData.arrowStyle = "fa fa-arrow-down";
    }
    return processedData;
  };

  updateCurrentDynamic = (dynamicData) => {
    const { value, arrowStyle } = dynamicData;
    this.setState({
      value,
      arrowStyle
    });
  };

  render() {
    const { value, arrowStyle, currentValue } = this.processingData();
    const { measure } = this.props;
    const measureStyle =
      measure === "g/m^3" || measure === "ppm" ? "measure-sm" : "measure-md";

    return (
      <div
        className="param-card__current-info"
        onClick={() => {
          new Audio("sounds/co2_sound_danger.mp3").play();
        }}
      >
        <div className="current-info__value">
          {currentValue}
          <span className={measureStyle}>{`${measure}`}</span>
        </div>
        <div className="current-info__dynamic">
          <span className="dynamic_value">
            <i className={arrowStyle} aria-hidden="true" />
            {`${value}`}
          </span>
        </div>
      </div>
    );
  }
}

export default CurrentInfoDynamic;
