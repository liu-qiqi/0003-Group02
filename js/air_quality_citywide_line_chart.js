

const elCitywideLineChart = document.getElementById('citywide-line-chart');

// Line Chart
const option = {
    // title: {
    //     text: 'Citywide Air Pollution',
    //     left: 'center',
    //     top: '-4px',
    //     textStyle: {
    //         color: 'black',
    //         fontSize: 22,
    //         fontWeight: 'bold',
    //         align: 'center',
    //     }
    // },

    grid: {
        left: 175,
        top: 25,
        right: 175,
        bottom: 10
    },

    tooltip: {
        trigger: 'axis'
    },

    legend: {
        data: ['PM2.5', 'O3', 'NO2', 'NOx', 'SO2'],
        // right: '75px',
        // top: '0px'
    },

    // toolbox: {
    //     show: true,
    //     feature: {
    //         magicType: { show: true, type: ['stack', 'tiled'] },
    //         saveAsImage: { show: true }
    //     }
    // },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        name: 'Year',
        nameLocation: 'center',
        nameTextStyle: {
            padding: [15, 0, 0, 0],
            fontSize: 15,
            color: 'black'
        },
        data: ['2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021']
    },

    yAxis: {
        type: 'value',
        name: 'Mean (ppb)',
        nameLocation: 'center',
        nameTextStyle: {
            padding: [0, 0, 15, 0],
            fontSize: 15,
            color: 'black'
        }
    },

    series: [
        {
            name: 'PM2.5',
            type: 'line',
            smooth: true,
            data: [8.6, 8.9, 8.6, 7.4, 7.4, 7, 6.6, 6.1, 6.5],
        },

        {
            name: 'O3',
            type: 'line',
            smooth: true,
            data: [31, 31.4, 31.8, 33.8, 29.5, 30.6, 30.6, 29.9, 30.2],
        },

        {
            name: 'NO2',
            type: 'line',
            smooth: true,
            data: [18.8, 18.9, 18.4, 17.6, 17.8, 17, 15.6, 15.2, 15.7],
        },

        {
            name: 'NOx',
            type: 'line',
            smooth: true,
            data: [16.7, 19.5, 17.5, 15.6, 12.9, 11.7, 10.7, 10.9, 11.4],
        },
    ]
};

// All the above is applied to the chart

function drawCitywideLineChart() {
    const chartWidth = elCitywideLineChart.offsetWidth;
    const chartHeight = elCitywideLineChart.offsetHeight;

    elCitywideLineChart.style.width = chartWidth + 'px';
    elCitywideLineChart.style.height = chartHeight + 'px';

    const citywideLineChart = echarts.init(elCitywideLineChart, {
        width: chartWidth * 0.9 - 250,
        height: chartHeight * 0.75,
    });

    citywideLineChart.setOption(option);
}

drawCitywideLineChart();
