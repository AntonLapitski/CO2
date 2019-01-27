import React from "react";

function MiniChart(props) {
  const chartContainerStyle = props.isExpand ? "" : "none";
  return (
    <div className={`${chartContainerStyle} mini-chart__container`}>
      <canvas id={props.chartId} />
    </div>
  );
}

export default MiniChart;
