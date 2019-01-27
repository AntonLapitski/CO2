import {
  CHARTS_DEMON_SET,
  CHARTS_DEMON_DELETE
} from "../actions/miniChartsDemon";
import { clearInterval } from "timers";

const initialState = null;

export const miniChartsDemon = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHARTS_DEMON_SET:
      return payload;
    case CHARTS_DEMON_DELETE:
      clearInterval(state);
      return payload;
    default:
      return state;
  }
};
