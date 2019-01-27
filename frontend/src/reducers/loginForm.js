import { LOGIN_FORM_UPDATE } from "../actions/loginForm";

const initialState = {
  deviceId: "",
  errors: [],
  isLoading: false
};

export const loginForm = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_FORM_UPDATE:
      console.log({ ...payload });
      const { deviceId, errors, isLoading } = payload;
      return {
        deviceId,
        errors,
        isLoading
      };
    default:
      return state;
  }
};
