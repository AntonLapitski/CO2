import React, { Component } from "react";
import { connect } from "react-redux";
import { ParamCardTemp } from "../ParamCardTemp";
import { ParamCardHumidity } from "../ParamCardHumidity";
import { ParamCardCO2 } from "../ParamCardCO2";
import { runUpdateMiniCharts } from "../../actions/miniCharts";
import { deleteDemon } from "../../actions/miniChartsDemon";

class Sidebar extends Component {
  componentDidMount() {
    const { deviceId } = this.props;
    this.props.runUpdateMiniCharts(deviceId);
  }

  componentWillUnmount() {
    this.props.deleteDemon(this.props.miniChartsDemon);
  }

  render() {
    return (
      <div className="col-md-3">
        <ParamCardTemp />
        <ParamCardHumidity />
        <ParamCardCO2 />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { miniChartsDemon } = state;
  const { deviceId } = state.device;
  return {
    miniChartsDemon,
    deviceId
  };
}

export default connect(
  mapStateToProps,
  {
    runUpdateMiniCharts,
    deleteDemon
  }
)(Sidebar);
