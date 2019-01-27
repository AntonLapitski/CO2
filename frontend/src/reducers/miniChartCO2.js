import { ACTION_INIT, ACTION_UPDATE } from "../actions/miniChartCO2";
import { initChart, updateChart } from "./helpers";

const initialState = {
  chart: null,
  lablesAxesX: [],
  dataAxesY: [],
  measure: "ppm"
};

export const miniChartCO2 = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_INIT:
      return initChart(payload);
    case ACTION_UPDATE:
      return updateChart(state, payload);
    default:
      return state;
  }
};
