import React, { Component } from "react";
import { connect } from "react-redux";
import { Chart } from "chart.js";
import { ParamCardHeader } from "../ParamCardHeader";
import { CurrentInfoDynamic } from "../CurrentInfoDynamic";
import { ParamCardToggle } from "../ParamCardToggle";
import { initChart } from "../../actions/miniChartCO2";
import { config } from "./chartConfig";

class ParamCardCO2 extends Component {
  constructor(props) {
    super(props);
    this.chartId = "miniChartCO2";

    this.state = {
      cardName: "CO2",
      measure: "ppm",
      chart: null,
      isExpand: false
    };
    this.handlerParamCardToggle = this.handlerParamCardToggle.bind(this);
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

  handlerParamCardToggle = () => {
    console.log("handlerParamCardToggle");

    this.setState({
      isExpand: !this.state.isExpand
    });
  };

  render() {
    const { isExpand, cardName } = this.state;
    const { measure, dataAxesY } = this.props.miniChartCO2;
    const chartContainerStyle = isExpand ? "" : "none";
    return (
      <div className="col-md-12 param-card upper">
        <ParamCardHeader
          cardName={cardName}
          iconClassName={"fa fa-cloud fa-sm"}
          handleToggle={this.handlerSettingsToggle}
          settings={false}
        />
        <CurrentInfoDynamic data={dataAxesY} measure={measure} />
        <div className={`${chartContainerStyle} mini-chart__container`}>
          <canvas id={this.chartId} />
        </div>
        <ParamCardToggle
          toggleAction={this.handlerParamCardToggle}
          isExpand={isExpand}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { miniChartCO2 } = state;
  return {
    miniChartCO2
  };
}

export default connect(
  mapStateToProps,
  {
    initChart
  }
)(ParamCardCO2);
