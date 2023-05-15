          ////////*ge_chart3*////////
        var dom = document.getElementById('ge_chart3');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var app = {};

        var option;

        option = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['BEV', 'PHEV']
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020', '2021']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'BEV',
          type: 'line',
          data: [1863, 606, 1233, 1153, 1402,	2318,	4021,	7369,	8985,	12507,	22754],
          itemStyle: {
                        color: '#69b3a2'
                    },
        },

        {
          name: 'PHEV',
          type: 'line',
          data: [53,	3002,	3716,	3910,	2673,	4576,	8486,	10940, 7757,	8445,	18066],
          itemStyle:{
                      color: '#EE926B'
          }
        }
      ]
    };

        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);

      