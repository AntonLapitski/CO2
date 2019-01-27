const NS = "MINI_CHART_TEMP";
export const ACTION_INIT = `${NS}__INIT`;
export const ACTION_UPDATE = `${NS}__UPDATE`;

export const initChart = (data) => (dispatch) => {
  const { chart, lablesAxesX, dataAxesY, measure } = data;
  dispatch({
    type: ACTION_INIT,
    payload: {
      chart,
      lablesAxesX,
      dataAxesY,
      measure
    }
  });
};

export const updateChart = (data) => (dispatch) => {
  const { lablesAxesX, dataAxesY, measure } = data;
  dispatch({
    type: ACTION_UPDATE,
    payload: {
      lablesAxesX,
      dataAxesY,
      measure
    }
  });
};
