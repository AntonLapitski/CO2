import {
  ACTION_INIT,
  ACTION_LOADING,
  ACTION_STOP_LOADING,
  ACTION_UPDATE
} from "../actions/mainChart";
import { updateMainChart } from "./helpers";

const initialState = {
  chart: null,
  deviceLogs: {},
  isLoading: false
};

export const mainChart = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_INIT:
      return {
        chart: payload,
        deviceLogs: {},
        isLoading: false
      };
    case ACTION_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case ACTION_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case ACTION_UPDATE:
      return updateMainChart(state, payload);
    default:
      return state;
  }
};
