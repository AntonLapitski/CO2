(function() {
  function toggleMiniChartContainer(containerNum) {
    var miniChartContainer = document.getElementById(
      `miniChartContainer${containerNum}`
    );
    var btnToggleMiniChartIcon3 = document.getElementById(
      `btnToggleMiniChartIcon${containerNum}`
    );
    var isContainClass = miniChartContainer.classList.contains("none");

    if (isContainClass) {
      miniChartContainer.classList.remove("none");
      btnToggleMiniChartIcon3.classList.remove("fa-angle-down");
      btnToggleMiniChartIcon3.classList.add("fa-angle-up");
    } else {
      miniChartContainer.classList.add("none");
      btnToggleMiniChartIcon3.classList.remove("fa-angle-up");
      btnToggleMiniChartIcon3.classList.add("fa-angle-down");
    }
  }

  function initializeHandlers() {
    for (let num = 1; num <= 3; num++) {
      const btnToggleMiniChart = document.getElementById(
        `btnToggleMiniChart${num}`
      );
      btnToggleMiniChart.addEventListener("click", () => {
        toggleMiniChartContainer(num);
      });
    }
  }

  initializeHandlers();
})();
