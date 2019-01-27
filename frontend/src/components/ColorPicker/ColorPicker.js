import React, { Component } from "react";
import { TwitterPicker } from "react-color";
import { connect } from "react-redux";

class ColorPicker extends Component {
  state = {
    background: "#fff",
    colors: [
      "#FF6900",
      "#FCB900",
      "#00D084",
      "#0693E3",
      "#EB144C",
      "#F78DA7",
      "#9900EF",
      "#193193"
    ]
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    this.props.colorDidChange(color);
  };

  render() {
    return (
      <TwitterPicker
        triangle={"top-right"}
        color={this.state.background}
        colors={this.state.colors}
        onChangeComplete={this.handleChangeComplete}
      />
    );
  }
}

export default connect(
  null,
  null
)(ColorPicker);
