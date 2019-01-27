const CO2 = "cO2";
const TEMPERATURE = "temperature";
const HUMIDITY = "humidity";

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

function funcBeforeUpdateDay() {
  console.log("funcBeforeUpdateDay");
}

function funcSuccessUpdateDay(data) {
  console.log(data);
}

function filterArrByKey(key, array) {
  console.log("key " + key);
  //  const rezArr = [key];
  const rezObj = {
    labels: [],
    data: []
  };

  const step = 15;
  counter = 0;

  array.forEach((element) => {
    //    const rand = Math.floor(Math.random() * (8 - 0)) + 0;
    const rand = 0;
    rezObj.labels.push(counter);
    rezObj.data.push(element.data[key] + rand);
    counter = counter + step;
  });
  console.log({ rezObj });

  return rezObj;
}

function getNextValues(from, count, Objarray) {
  const rezObj = {
    labels: [],
    data: []
  };

  for (let index = from; index < Objarray.data.length; index++) {
    if (index > from + count) {
      return rezObj;
    }
    rezObj.labels.push(Objarray.labels[index]);
    rezObj.data.push(Objarray.data[index]);
  }
  return rezObj;
}

const arr1 = filterArrByKey(TEMPERATURE, dataAPI);
const arr2 = filterArrByKey(HUMIDITY, dataAPI);
const arr3 = filterArrByKey(CO2, dataAPI);

var ctx = document.getElementById("myChart1").getContext("2d");

let prevValue = 0;
prevValue = prevValue + 7;
const tmp1 = getNextValues(prevValue, 4, arr1);
console.log({ tmp1 });

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: tmp1.labels,
    datasets: [
      {
        label: "Humiduty",
        //backgroundColor: "rgb(51, 185, 219, 0.418)",
        //backgroundColor: "transparent",
        borderColor: "rgb(255, 255, 219)",
        data: tmp1.data,
        borderWidth: 1,
        pointRadius: 2
        //lineTension: 0
      }
    ]
  },

  // Configuration options go here
  options: GlobalOptions
});

let prevValue2 = 0;
prevValue2 = prevValue2 + 6;
const tmp2 = getNextValues(prevValue2, 5, arr2);

var ctx2 = document.getElementById("myChart2").getContext("2d");

var chart2 = new Chart(ctx2, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: tmp2.labels,
    datasets: [
      {
        label: "CO2",
        // borderColor: "rgb(255, 99, 255)",
        // backgroundColor: "rgb(255, 99, 132)",
        //backgroundColor: "rgb(84, 187, 101, 0.589)",
        //transparentbackgroundColor: "rgb(84, 187, 130, 0.918)",
        //backgroundColor: "transparent",
        borderColor: "rgb(255, 255, 255)",
        data: tmp2.data,
        borderWidth: 1,
        pointRadius: 2
        //fill: false
      }
    ]
  },

  // Configuration options go here
  options: GlobalOptions
});

let prevValue3 = 0;
prevValue3 = prevValue3;
const tmp3 = getNextValues(prevValue3, 5, arr3);

var ctx3 = document.getElementById("myChart3").getContext("2d");

var chart3 = new Chart(ctx3, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: tmp3.labels,
    datasets: [
      {
        label: "CO2",
        // borderColor: "rgb(255, 99, 255)",
        // backgroundColor: "rgb(255, 99, 132)",
        // backgroundColor: "rgb(84, 187, 101, 0.589)",
        // backgroundColor: "transparent",
        borderColor: "rgb(255, 255, 255)",
        data: tmp3.data,
        borderWidth: 1,
        pointRadius: 2
        //fill: false
      }
    ]
  },

  // Configuration options go here
  options: GlobalOptions
});

let prevValue4 = 0;
prevValue4 = prevValue4;
const tmp4 = getNextValues(prevValue4, 20, arr3);

var ctx4 = document.getElementById("myChart4").getContext("2d");

var chart4 = new Chart(ctx4, {
  // The type of chart we want to create
  type: "line",

  // The data for our dataset
  data: {
    labels: arr3.labels,
    datasets: [
      {
        label: "CO2",
        // borderColor: "rgb(255, 99, 255)",
        // backgroundColor: "rgb(255, 99, 132)",
        //backgroundColor: "rgb(84, 187, 101, 0.589)",
        backgroundColor: "transparent",
        borderColor: "rgb(84, 187, 101)",
        data: arr3.data,
        borderWidth: 2,
        pointRadius: 2
        //fill: false
      }
    ]
  },

  // Configuration options go here
  options: {
    legend: {
      //display: false
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
});
/*
btnGetData.addEventListener("click", function() {
  console.log("btn get data");
  console.log({ dataAPI });
  const arr1 = filterArrByKey(CO2, dataAPI);
  const arr2 = filterArrByKey(TEMPERATURE, dataAPI);
  const arr3 = filterArrByKey(HUMIDITY, dataAPI);

  console.log({ arr1 });
  console.log({ arr2 });
  console.log({ arr3 });
});


var timerId = setInterval(function() {
  const arr1 = filterArrByKey(CO2, dataAPI);
  const arr2 = filterArrByKey(TEMPERATURE, dataAPI);
  const arr3 = filterArrByKey(HUMIDITY, dataAPI);
  console.log(arr1.length);

  var chart1 = c3.generate({
    bindto: "#chart1",
    data: {
      columns: [arr1]
    },
    type: "spline"
  });

  var chart2 = c3.generate({
    bindto: "#chart2",
    data: {
      columns: [arr2]
    }
  });
  var chart3 = c3.generate({
    bindto: "#chart3",
    data: {
      columns: [arr3]
    }
  });
}, 2000);
*/
/**
 * 
 * $.ajax({
    url:
      "http://climate.any-case.info:1000/api/OfficeClimateSensors?deviceId=fa238a69-03ab-40d1-a51c-eb384844d243&from=2018-11-26&to=2018-11-27",
    type: "POST",
    data: { key: "val" },
    dataType: "html",
    beforeSend: funcBeforeUpdateDay,
    success: funcSuccessUpdateDay,
    complete: function() {
      callback();
    }
  });
 */

/*
var chart = c3.generate({
  data: {
    url: "/data/c3_test.csv"
  }
});

setTimeout(function () {
    c3.generate({
        data: {
            url: '/data/c3_test.json',
            mimeType: 'json'
        }
    });
}, 1000);*/

/**
 * {
  "data1": [220, 240, 270, 250, 280],
  "data2": [180, 150, 300, 70, 120],
  "data3": [200, 310, 150, 100, 180]
}
 */
