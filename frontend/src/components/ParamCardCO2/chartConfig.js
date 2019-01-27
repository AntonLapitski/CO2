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
        label: "CO2",
        // backgroundColor: "rgb(255, 99, 132)",
        // backgroundColor: "rgb(84, 187, 101, 0.589)",
        backgroundColor: "rgb(239, 93, 93, 0.6)",
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
