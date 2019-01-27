import React, { Component } from "react";

export class ParamCardToggle extends Component {
  constructor(props) {
    super(props);

    this.arrowStyleUp = "fa fa-angle-up fa-lg";
    this.arrowStyleDown = "fa fa-angle-down fa-lg";
  }

  toggle = () => {
    console.log(this);

    const { isExpand } = this.props;
    console.log({ isExpand });
    this.props.toggleAction();
  };

  render() {
    const { isExpand } = this.props;
    const { arrowStyleUp, arrowStyleDown } = this;
    return (
      <div onClick={this.toggle} className="param-card_toggle">
        <i
          className={isExpand ? arrowStyleUp : arrowStyleDown}
          aria-hidden="true"
        />
      </div>
    );
  }
}

export default ParamCardToggle;
