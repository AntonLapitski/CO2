import { DATE_PICKER_UPDATE } from "../actions/datePicker";

const initialState = {
  from: new Date(+new Date() - 3600).toISOString(),
  to: new Date().toISOString()
};

export const datePicker = (state = initialState, { type, payload }) => {
  switch (type) {
    case DATE_PICKER_UPDATE:
      return {
        ...payload
      };
    default:
      return state;
  }
};
