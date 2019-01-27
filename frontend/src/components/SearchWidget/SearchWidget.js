import React, { Component } from "react";
import { connect } from "react-redux";
import { getLogsFromTo } from "../../actions/getLogsFromTo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class SearchWidget extends Component {
  constructor(props) {
    super(props);
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();

    this.state = {
      startDate: defaultStartDate,
      endDate: defaultEndDate
    };
  }

  handleSearchButton = () => {
    const { getLogsFromTo, deviceId } = this.props;
    const { startDate, endDate } = this.state;
    getLogsFromTo(deviceId, { fromDate: startDate, toDate: endDate });
  };

  handleChangeStart = (strDate) => {
    this.setState({
      startDate: strDate,
      endDate: strDate
    });
  };

  handleChangeEnd = (strDate) => {
    this.setState({
      endDate: strDate
    });
  };

  render() {
    return (
      <div className="main-chart__container mb-1">
        <div className="data-search__container">
          <DatePicker
            selected={this.state.startDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd h:mm aa"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            className="form-control form-control-sm mr-2"
            disabled={this.props.isLoading}
          />
          <DatePicker
            selected={this.state.endDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd h:mm aa"
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            className="form-control form-control-sm"
            disabled={this.props.isLoading}
          />
          <button
            className="btn btn-success btn-sm ml-3"
            onClick={this.handleSearchButton}
            disabled={this.props.isLoading}
          >
            Search
          </button>
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
    getLogsFromTo
  }
)(SearchWidget);
