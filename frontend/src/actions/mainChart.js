const NS = "MAIN_CHART";
export const ACTION_INIT = `${NS}__INIT`;
export const ACTION_UPDATE = `${NS}__UPDATE`;
export const ACTION_LOADING = `${NS}__LOADING`;
export const ACTION_STOP_LOADING = `${NS}__STOP_LOADING`;

export const initChart = (chart) => (dispatch) => {
  dispatch({
    type: ACTION_INIT,
    payload: chart
  });
};

export const updateChart = (data) => (dispatch) => {
  dispatch({
    type: ACTION_UPDATE,
    payload: data
  });
};
