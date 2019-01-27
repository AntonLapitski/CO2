import { ACTION_INIT, ACTION_UPDATE } from "../actions/miniChartTemp";
import { initChart, updateChart } from "./helpers";

const initialState = {
  chart: null,
  lablesAxesX: [],
  dataAxesY: [],
  measure: "°C"
};

export const miniChartTemp = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_INIT:
      return initChart(payload);
    case ACTION_UPDATE:
      return updateChart(state, payload);
    default:
      return state;
  }
};
