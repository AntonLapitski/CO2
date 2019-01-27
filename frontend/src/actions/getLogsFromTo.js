import axios from "axios";
import { apiConfig } from "../appConfig";
import {
  ACTION_LOADING,
  ACTION_UPDATE,
  ACTION_STOP_LOADING
} from "./mainChart";

export const getLogsFromTo = (deviceId, requestData) => (dispatch) => {
  dispatch({
    type: ACTION_LOADING
  });

  const formData = new FormData();
  formData.append("deviceId", `${deviceId}`);

  if (requestData) {
    let { fromDate, toDate } = requestData;
    fromDate = new Date(fromDate).toISOString();
    toDate = new Date(toDate).toISOString();

    formData.append("from", `${fromDate}`);
    formData.append("to", `${toDate}`);
  }

  axios({
    method: "post",
    url: apiConfig.updateMainChartUrl,
    data: formData
  })
    .then((response) => {
      const deviceData = response.data.device.deviceData;
      dispatch({
        type: ACTION_UPDATE,
        payload: deviceData
      });
    })
    .catch((error) => {
      dispatch({
        type: ACTION_STOP_LOADING
      });
      console.log({ error });
    });
};
