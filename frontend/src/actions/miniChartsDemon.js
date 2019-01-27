const NS = "MINI_CHARTS_DEMON";
export const CHARTS_DEMON_SET = `${NS}__UPDATE`;
export const CHARTS_DEMON_DELETE = `${NS}__DELETE`;

export const setDemon = (demon) => (dispatch) => {
  dispatch({
    type: CHARTS_DEMON_SET,
    payload: demon
  });
};

export const deleteDemon = (demon) => (dispatch) => {
  dispatch({
    type: CHARTS_DEMON_DELETE,
    payload: demon
  });
};
