export const initChart = (payload) => {
  const { chart, lablesAxesX, dataAxesY } = payload;
  chart.data.labels = lablesAxesX;
  chart.data.datasets[0].data = dataAxesY;

  chart.update();
  return {
    ...payload
  };
};

export const updateChart = (state, payload) => {
  const { chart } = state.chart;
  const { lablesAxesX, dataAxesY } = payload;
  chart.data.labels = lablesAxesX;
  chart.data.datasets[0].data = dataAxesY;

  chart.update();
  return {
    chart,
    ...payload
  };
};

export const updateMainChart = (state, payload) => {
  const { chart } = state;
  try {
    const { temperature, humidity, CO2 } = payload;

    chart.data.labels = temperature.axesX;
    chart.data.datasets[0].data = temperature.axesY;
    chart.data.datasets[1].data = humidity.axesY;
    chart.data.datasets[2].data = CO2.axesY;

    chart.update();
    return {
      chart,
      ...payload,
      isLoading: false
    };
  } catch (error) {
    return {
      chart,
      ...state,
      isLoading: false
    };
  }
};
