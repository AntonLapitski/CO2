const NS = "DATE_PICKER";
export const DATE_PICKER_UPDATE = `${NS}__UPDATE`;

export const updateDatePicker = (data) => (dispatch) => {
  const { from, to } = data;
  dispatch({
    type: DATE_PICKER_UPDATE,
    payload: {
      from,
      to
    }
  });
};
