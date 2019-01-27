import React, { Component } from "react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { SearchWidget } from "../../components/SearchWidget";
import { MainChart } from "../../components/MainChart";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <div className="row">
          <Sidebar />
          <div className="col-md-9">
            <SearchWidget />
            <MainChart />
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
  {}
)(Dashboard);
