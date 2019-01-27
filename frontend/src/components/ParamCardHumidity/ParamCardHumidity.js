import React, { Component } from "react";
import { connect } from "react-redux";
import { Chart } from "chart.js";
import { ParamCardHeader } from "../ParamCardHeader";
import { ParamCardSettings } from "./ParamCardSettings";
import { CurrentInfoDynamic } from "../CurrentInfoDynamic";
import { MiniChart } from "../MiniChart";
import { ParamCardToggle } from "../ParamCardToggle";
import { initChart } from "../../actions/miniChartHumidity";
import { config } from "./chartConfig";

class ParamCardHumidity extends Component {
  constructor(props) {
    super(props);
    this.chartId = "miniChartHumidity";

    this.state = {
      cardName: "Humidity",
      measure: "g/m^3",
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
      lablesAxesX: [1],
      dataAxesY: [1],
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
    const { measure, dataAxesY } = this.props.miniChartHumidity;
    return (
      <div className="col-md-12 param-card blue">
        {isExpandSettings ? (
          <ParamCardSettings handleToggle={this.handlerSettingsToggle} />
        ) : (
          <div>
            <ParamCardHeader
              handleToggle={this.handlerSettingsToggle}
              cardName={cardName}
              iconClassName={"fa fa-tint fa-sm"}
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

function mapToStateProps(state) {
  const { miniChartHumidity } = state;
  return {
    miniChartHumidity
  };
}

export default connect(
  mapToStateProps,
  {
    initChart
  }
)(ParamCardHumidity);
