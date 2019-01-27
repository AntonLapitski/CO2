import { ACTION_INIT, ACTION_UPDATE } from "../actions/miniChartHumidity";
import { initChart, updateChart } from "./helpers";

const initialState = {
  chart: null,
  lablesAxesX: [],
  dataAxesY: [],
  maesure: "g/m^3"
};

export const miniChartHumidity = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_INIT:
      return initChart(payload);
    case ACTION_UPDATE:
      return updateChart(state, payload);
    default:
      return state;
  }
};
