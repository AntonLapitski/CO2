import axios from "axios";
import { ACTION_UPDATE as TEMP_UPDATE_DATA } from "./miniChartTemp";
import { ACTION_UPDATE as HUMIDITY_UPDATE_DATA } from "./miniChartHumidity";
import { ACTION_UPDATE as CO2_UPDATE_DATA } from "./miniChartCO2";
import { CHARTS_DEMON_SET } from "./miniChartsDemon";
import { apiConfig } from "../appConfig";
import { setInterval } from "timers";

function hotUpdateMiniCharts(deviceId, dispatch) {
  const formData = new FormData();
  formData.append("deviceId", `${deviceId}`);
  axios({
    method: "post",
    url: apiConfig.updateMiniChartsUrl,
    data: formData
  }).then((response) => {
    console.log({ response });
    let deviceData = null;
    try {
      deviceData = response.data.device.deviceData;
      dispatch({
        type: TEMP_UPDATE_DATA,
        payload: {
          lablesAxesX: deviceData.temperature.axesX,
          dataAxesY: deviceData.temperature.axesY,
          measure: "°C"
        }
      });

      dispatch({
        type: HUMIDITY_UPDATE_DATA,
        payload: {
          lablesAxesX: deviceData.humidity.axesX,
          dataAxesY: deviceData.humidity.axesY,
          measure: "%"
        }
      });

      dispatch({
        type: CO2_UPDATE_DATA,
        payload: {
          lablesAxesX: deviceData.cO2.axesX,
          dataAxesY: deviceData.cO2.axesY,
          measure: "ppm"
        }
      });
    } catch (error) {
      console.log("hotUpdateMiniCharts ", { error });
    }
  });
}

export const runUpdateMiniCharts = (deviceId) => async (dispatch) => {
  setTimeout(() => {
    hotUpdateMiniCharts(deviceId, dispatch);
  }, 10);

  const miniChartsDemon = setInterval(() => {
    hotUpdateMiniCharts(deviceId, dispatch);
  }, 15000);

  dispatch({
    type: CHARTS_DEMON_SET,
    payload: miniChartsDemon
  });
};
