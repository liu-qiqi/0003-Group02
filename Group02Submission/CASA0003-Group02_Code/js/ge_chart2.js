      ////////*ge_chart2*////////
      var dom = document.getElementById('ge_chart2');
    var myChart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });
    var app = {};
    
    var option;

    option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // Use axis to trigger tooltip
      type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['2021', '2020', '2019', '2018', '2017', '2016']
  },
  series: [
    {
      name: 'Hybrid Electric',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data:[5396, 4259, 3804, 3572, 3428, 3067],
      itemStyle: {
                        color: '#899481'
                    },
    },
    {
      name: 'Electric',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [3055, 2434, 2251, 2311, 2109, 1421],
      itemStyle: {
                        color: '#E07D54'
                    },
    },
    {
      name: 'Plug-in Hybrid',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [1873, 1515, 1731, 1800, 1445, 1300],
      itemStyle: {
                        color: '#FFE1A0'
                    },
    },
    {
      name: 'Natural Gas',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [458, 419, 432, 427, 489, 2244],
      itemStyle: {
                        color: '#E2F3FD'
                    },
    },
    {
      name: 'Hydrogen & Fuel Cell',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [511, 350, 361, 334, 410, 377],
      itemStyle: {
                        color: '#E6E1DD'
                    },
    }
  ]
};

    if (option && typeof option === 'object') {
      myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
      

