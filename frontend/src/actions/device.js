import axios from "axios";
import { LOGIN_FORM_UPDATE } from "./loginForm";
import { apiConfig } from "../appConfig";

const NS = "CURRENT_DEVICE";
export const SET_CURRENT_DEVICE = `${NS}__SET`;
export const UPDATE_CURRENT_DEVICE = `${NS}__UPDATE`;
export const RESET_CURRENT_DEVICE = `${NS}__RESET`;

export const findDeviceById = (id) => async (dispatch) => {
  dispatch({
    type: LOGIN_FORM_UPDATE,
    payload: {
      deviceId: id,
      errors: [],
      isLoading: true
    }
  });

  const formData = new FormData();
  formData.append("deviceId", `${id}`);
  try {
    const response = await axios({
      method: "post",
      url: apiConfig.authUrl,
      data: formData
    });
    console.log(response);

    const { deviceId } = response.data.device;
    if (deviceId) {
      localStorage.setItem("device", JSON.stringify(response.data.device));
      dispatch({
        type: SET_CURRENT_DEVICE,
        payload: {
          deviceId,
          errors: [],
          isLoading: false
        }
      });
    } else {
      dispatch({
        type: LOGIN_FORM_UPDATE,
        payload: {
          deviceId: id,
          errors: [...response.data.errors],
          isLoading: false
        }
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FORM_UPDATE,
      payload: {
        deviceId: id,
        errors: [error],
        isLoading: false
      }
    });
  }
};

export const checkDeviceLocaly = () => (dispatch) => {
  const device = JSON.parse(localStorage.getItem("device"));

  if (device) {
    const { deviceId } = device;
    dispatch({
      type: SET_CURRENT_DEVICE,
      payload: {
        deviceId
      }
    });
  }
};

export const setCurrentDevice = (data) => (dispatch) => {
  localStorage.setItem("device", JSON.stringify(data));
  const { deviceId } = data;
  dispatch({
    type: SET_CURRENT_DEVICE,
    payload: {
      deviceId
    }
  });
};

export const updateCurrentDevice = (data) => (dispatch) => {
  localStorage.setItem("device", JSON.stringify(data));
  const { deviceId } = data;
  dispatch({
    type: SET_CURRENT_DEVICE,
    payload: {
      deviceId
    }
  });
};

export const resetCurrentDevice = () => (dispatch) => {
  localStorage.removeItem("device");
  dispatch({
    type: RESET_CURRENT_DEVICE,
    payload: null
  });
};
