const elEstimatedLineChart = document.getElementById('estimated-line-chart');

// Line Chart
const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
            color: '#999'
        }
      }
    },
    grid: {
        left: 175,
        top: 30,
        right: 175,
        bottom: 10
    },
    legend: {
        data: ['PM2.5', 'NOx']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        name: 'Year',
        nameLocation: 'center',
        nameTextStyle: {
            padding: [15, 0, 0, 0],
            fontSize: 15,
            color: 'black'
        },
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'PM2.5',
        nameTextStyle: {
          padding: [0, 45, 0, 0],
          fontSize: 15,
          color: 'black'
        },
        min: 0.003,
        max: 0.008,
        interval: 0.001
      },
      {
        type: 'value',
        name: 'NOx',
        nameTextStyle: {
          padding: [0, 0, 0, 35],
          fontSize: 15,
          color: 'black'
        },
        min: 0.1,
        max: 0.6,
        interval: 0.1
      }
    ],
    series: [
      {
        name: 'PM2.5',
        type: 'line',
        data: [
          0.007,0.006,0.006,0.005,0.005,0.005,0.004,0.004,0.004
        ]
      },
      {
        name: 'NOx',
        type: 'line',
        yAxisIndex: 1,
        data: [
          0.562,0.479,0.401,0.343,0.29,0.256,0.215,0.192,0.173
        ]
      }
    ]
  };


// All the above is applied to the chart

function drawEstimatedLineChart() {
    const chartWidth = elEstimatedLineChart.offsetWidth;
    const chartHeight = elEstimatedLineChart.offsetHeight;

    elEstimatedLineChart.style.width = chartWidth + 'px';
    elEstimatedLineChart.style.height = chartHeight + 'px';

    const estimatedLineChart = echarts.init(elEstimatedLineChart, {
        width: chartWidth * 0.9 - 250,
        height: chartHeight * 0.75,
    });

    estimatedLineChart.setOption(option);
}

drawEstimatedLineChart();
