const GlobalOptions = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          // min: 13.5,
          //max: 15.2,
          display: false
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      }
    ]
  }
};

export const config = {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: [],
    datasets: [
      {
        label: "Humidity",
        backgroundColor: "rgb(51, 185, 219, 0.418)",
        //backgroundColor: "transparent",
        borderColor: "rgb(255, 255, 219)",
        data: [],
        borderWidth: 1,
        pointRadius: 2
        //lineTension: 0
      }
    ]
  },

  // Configuration options go here
  options: GlobalOptions
};
