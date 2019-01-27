import React, { Component } from "react";
import { connect } from "react-redux";
import { Chart } from "chart.js";
import { ParamCardHeader } from "../ParamCardHeader";
import { ParamCardSettings } from "./ParamCardSettings";
import { CurrentInfoDynamic } from "../CurrentInfoDynamic";
import { MiniChart } from "../MiniChart";
import { ParamCardToggle } from "../ParamCardToggle";
import { initChart } from "../../actions/miniChartTemp";
import { config } from "./chartConfig";

class ParamCardTemp extends Component {
  constructor(props) {
    super(props);
    this.chartId = "miniChartTemp";

    this.state = {
      cardName: "Temp",
      measure: "°C",
      chart: null,
      isExpandSettings: false,
      isExpand: false
    };

    this.handlerParamCardToggle = this.handlerParamCardToggle.bind(this);
    this.handlerSettingsToggle = this.handlerSettingsToggle.bind(this);
  }

  componentDidMount() {
    const ctx = document.getElementById(this.chartId).getContext("2d");
    const chart = new Chart(ctx, config);
    this.props.initChart({
      chart,
      lablesAxesX: [1, 2, 3, 4, 5],
      dataAxesY: [1, 1, 1, 1, 1],
      measure: this.state.measure
    });
    this.setState({
      chart
    });
  }

  handlerSettingsToggle = () => {
    this.setState({
      isExpandSettings: !this.state.isExpandSettings
    });
  };

  handlerParamCardToggle = () => {
    this.setState({
      isExpand: !this.state.isExpand
    });
  };

  render() {
    const { isExpandSettings, isExpand, cardName } = this.state;
    const { measure, dataAxesY } = this.props.miniChartTemp;
    return (
      <div className="col-md-12 param-card yellow">
        {isExpandSettings ? (
          <ParamCardSettings handleToggle={this.handlerSettingsToggle} />
        ) : (
          <div>
            <ParamCardHeader
              handleToggle={this.handlerSettingsToggle}
              cardName={cardName}
              iconClassName={"fa fa-thermometer-half fa-sm"}
              settings={true}
            />
            <CurrentInfoDynamic data={dataAxesY} measure={measure} />{" "}
          </div>
        )}
        <MiniChart chartId={this.chartId} isExpand={isExpand} />
        <ParamCardToggle
          toggleAction={this.handlerParamCardToggle}
          isExpand={isExpand}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { miniChartTemp } = state;
  return {
    miniChartTemp
  };
}

export default connect(
  mapStateToProps,
  {
    initChart
  }
)(ParamCardTemp);
