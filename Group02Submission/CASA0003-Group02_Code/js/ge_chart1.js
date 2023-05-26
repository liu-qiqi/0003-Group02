////////*ge_chart1*////////
        var dom = document.getElementById('ge_chart1');
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
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      
      legend: {
        data: ['Employment', 'Cumulative Growth']
      },
      xAxis: [
        {
          type: 'category',
          data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Total Employment',
          min: 100000,
          max: 200000,
          interval: 50000,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: 'Cumulative Growth',
          min: 0,
          max: 20,
          interval: 5,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: [
        {
          name: 'Employment',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value;
            }
          },
          data: [
            140964, 145778, 151464,159744, 163754, 158686, 165055
          ],
            itemStyle: {
                        color: '#899481'
                    },
            barWidth: '50%'
        },
        {
          name: 'Cumulative Growth',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' %';
            }
          },
            data: [0, 3, 7, 13, 16, 13, 17],
            itemStyle: {
                        color: '#304F6D'
                    }
        }
      ]
    };

        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }

        window.addEventListener('resize', myChart.resize);
