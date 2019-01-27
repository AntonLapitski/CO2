import React, { Component } from "react";
import { connect } from "react-redux";
import { Chart } from "chart.js";
import { initChart } from "../../actions/mainChart";
import { config } from "./mainChartConfig";
import { getLogsFromTo } from "../../actions/getLogsFromTo";
import { ChartLineSettings } from "../ChartLineSettings";

export class MainChart extends Component {
  constructor(props) {
    super(props);
    this.chartId = "mainChart";

    this.state = {
      chart: null,
      chartLines: config.chartLines
    };

    this.handlerChangeColor = this.handlerChangeColor.bind(this);
    this.handlerToggleChartVisible = this.handlerToggleChartVisible.bind(this);
  }

  componentDidMount() {
    const ctx = document.getElementById(this.chartId).getContext("2d");
    const chart = new Chart(ctx, config);

    this.setState({
      chart
    });

    this.props.initChart(chart);
  }

  handlerChangeColor = (color, chartType) => {
    const { hex } = color;
    const { chart, chartLines } = this.state;
    const { id } = chartLines[chartType];

    chart.data.datasets[id].borderColor = hex;
    chartLines[chartType].color = hex;

    chart.update();
    this.setState({
      chartLines
    });
  };

  handlerToggleChartVisible = (chartType) => {
    const { chart, chartLines } = this.state;
    const { id, isVisible } = chartLines[chartType];
    if (isVisible) {
      chart.data.datasets[id].hidden = isVisible;
      chart.update();
    } else {
      chart.data.datasets[id].hidden = isVisible;
      chart.update();
    }
    chartLines[chartType].isVisible = !isVisible;
    this.setState({
      chartLines
    });
  };

  render() {
    const { chartLines } = this.state;
    const { isLoading } = this.props;
    return (
      <div>
        <div className="main-chart">
          <div className="main-chart__container">
            {isLoading ? (
              <div className="content_loader">
                <i className="fas fa-sync fa-2x mr-3" />
                <span className="content-loader-text">Loading...</span>
              </div>
            ) : null}
            <div className="main-chart__settings">
              <ChartLineSettings
                type="temperatyre"
                color={chartLines.temperatyre.color}
                isVisible={chartLines.temperatyre.isVisible}
                colorDidChange={this.handlerChangeColor}
                toggleChartVisible={this.handlerToggleChartVisible}
              />
              <ChartLineSettings
                type="humidity"
                color={chartLines.humidity.color}
                isVisible={chartLines.humidity.isVisible}
                colorDidChange={this.handlerChangeColor}
                toggleChartVisible={this.handlerToggleChartVisible}
              />
              <ChartLineSettings
                type="CO2"
                color={chartLines.CO2.color}
                isVisible={chartLines.CO2.isVisible}
                colorDidChange={this.handlerChangeColor}
                toggleChartVisible={this.handlerToggleChartVisible}
              />
            </div>
            <canvas id={this.chartId} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { deviceId } = state.device;
  const { isLoading } = state.mainChart;
  return {
    deviceId,
    isLoading
  };
}

export default connect(
  mapStateToProps,
  {
    initChart,
    getLogsFromTo
  }
)(MainChart);
