export const config = {
  type: "line",

  chartLines: {
    temperatyre: {
      id: 0,
      isVisible: true,
      color: "#FF6900"
    },
    humidity: {
      id: 1,
      isVisible: true,
      color: "#0693E3"
    },
    CO2: {
      id: 2,
      isVisible: true,
      color: "#EB144C"
    }
  },

  data: {
    labels: [1, 2, 4, 5, 6, 7, 8],
    datasets: [
      {
        label: "°C",
        backgroundColor: "transparent",
        borderColor: "#FF6900",
        data: [3, 3, 3, 3, 3, 3, 3],
        borderWidth: 2,
        pointRadius: 2
        //fill: false
      },
      {
        label: "Humidity",
        backgroundColor: "transparent",
        borderColor: "#0693E3",
        data: [2, 2, 2, 2, 2, 2, 2],
        borderWidth: 2,
        pointRadius: 2
        //fill: false
      },
      {
        label: "CO2",
        backgroundColor: "transparent",
        borderColor: "#EB144C",
        data: [1, 1, 1, 1, 1, 1, 1],
        borderWidth: 2,
        pointRadius: 2
        //fill: false
      }
    ]
  },

  // Configuration options go here
  options: {
    legend: {
      display: false
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            // display: false,
            //drawBorder: false
          },
          ticks: {
            // min: 13.5,
            //max: 15.2,
            //display: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            //display: false,
            //drawBorder: false
          },
          ticks: {
            //display: false
          }
        }
      ]
    }
  }
};
