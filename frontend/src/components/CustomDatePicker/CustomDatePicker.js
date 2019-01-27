import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    this.props.callbackDate(new Date(date).toISOString());
  }

  render() {
    return (
      <DatePicker
        isClearable={true}
        dateFormat="yyyy-MM-dd"
        className="form-control form-control-sm"
        selected={this.state.startDate}
        onChange={this.handleChange}
        disabled={false}
        //minDate={new Date()}
      />
    );
  }
}

export default CustomDatePicker;
