const NS = "LOGIN_FORM";
export const LOGIN_FORM_UPDATE = `${NS}__UPDATE`;

export const updateLoginForm = (data) => (dispatch) => {
  const { deviceId, errors } = data;
  dispatch({
    type: LOGIN_FORM_UPDATE,
    payload: {
      deviceId,
      errors
    }
  });
};
