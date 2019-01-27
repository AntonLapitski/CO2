import {
  SET_CURRENT_DEVICE,
  UPDATE_CURRENT_DEVICE,
  RESET_CURRENT_DEVICE
} from "../actions/device";

const initialState = null;

export const device = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_DEVICE:
      return {
        ...payload
      };
    case UPDATE_CURRENT_DEVICE:
      return {
        ...payload
      };
    case RESET_CURRENT_DEVICE:
      return payload;
    default:
      return state;
  }
};
