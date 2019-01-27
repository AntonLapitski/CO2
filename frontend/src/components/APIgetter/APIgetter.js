import React, { Component } from "react";
import { connect } from "react-redux";
import { updateChart as updateChartTemp } from "../../actions/miniChartTemp";
import { updateChart as updateChartHumidity } from "../../actions/miniChartHumidity";
import { updateChart as updateChartCO2 } from "../../actions/miniChartCO2";
import { getDateFromTo } from "../../api";

class APIgetter extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.updateChart = this.updateChart.bind(this);
  }

  updateChart = (arr) => {
    const { arr1, arr2, arr3 } = arr;
    console.log(`end filter ${new Date()}`);
    localStorage.setItem("CO2", JSON.stringify(arr));
    const l = (localStorage.CO2.length * 16) / (8 * 1024);
    console.log(l);

    this.props.updateChartTemp({
      measure: "°C",
      lablesAxesX: arr1.labels.slice(-5),
      dataAxesY: arr1.data.slice(-5)
    });
    this.props.updateChartHumidity({
      measure: "%",
      lablesAxesX: arr2.labels.slice(-5),
      dataAxesY: arr2.data.slice(-5)
    });
    this.props.updateChartCO2({
      measure: "ppm",
      lablesAxesX: arr3.labels.slice(-5),
      dataAxesY: arr3.data.slice(-5)
    });
  };

  getRequest = () => {
    console.log("getRequest from to");
    console.log(new Date());

    getDateFromTo(this.updateChart);
  };

  render() {
    return (
      <div>
        APIgetter
        <button onClick={this.getRequest}>Get data</button>
      </div>
    );
  }
}

export default connect(
  null,
  {
    updateChartTemp,
    updateChartCO2,
    updateChartHumidity
  }
)(APIgetter);
