import { combineReducers } from "redux";
import { loginForm } from "./loginForm";
import { device } from "./device";
import { datePicker } from "./datePicker";
import { mainChart } from "./mainChart";
import { miniChartTemp } from "./miniChartTemp";
import { miniChartHumidity } from "./miniChartHumidity";
import { miniChartCO2 } from "./miniChartCO2";
import { miniChartsDemon } from "./miniChartsDemon";

export default combineReducers({
  loginForm,
  miniChartsDemon,
  device,
  datePicker,
  mainChart,
  miniChartTemp,
  miniChartHumidity,
  miniChartCO2
});
