const elLineChart = document.getElementById('line-chart');

// Data
const seriesList = {
    'PM2_5': [
        {
            name: "Bronx",
            type: "line",
            smooth: true,
            data: [9.1, 9.3, 9.2, 7.8, 7.7, 7.2, 6.9, 6.1, 6.6],
        },

        {
            name: "Brooklyn",
            type: "line",
            smooth: true,
            data: [8.7, 9.1, 8.7, 7.8, 7.5, 7.7, 6.7, 6.1, 6.6],
        },

        {
            name: "Manhattan",
            type: "line",
            smooth: true,
            data: [10.7, 10.8, 10.2, 9, 8.7, 8.5, 8.3, 7.2, 7.4],
        },

        {
            name: "Queens",
            type: "line",
            smooth: true,
            data: [8.4, 8.6, 8.3, 7.2, 7.2, 6.8, 6.5, 6.1, 6.5],
        },

        {
            name: "Staten Island",
            type: "line",
            smooth: true,
            data: [8, 8.4, 7.7, 6.8, 6.8, 6.4, 5.9, 5.5, 6.2],
        },

        {
            name: 'Citywide',
            type: 'line',
            smooth: true,
            data: [8.6, 8.9, 8.6, 7.4, 7.4, 7, 6.6, 6.1, 6.5],
        }
    ],

    'O3': [
        {
            name: 'Bronx',
            type: 'line',
            smooth: true,
            data: [31.2, 31.1, 30.4, 33.1, 28.8, 30.8, 29.9, 30.8, 29.8],
        },

        {
            name: 'Brooklyn',
            type: 'line',
            smooth: true,
            data: [31.1, 31.3, 32.5, 34, 30.3, 30.9, 31.1, 29.7, 30.5],
        },

        {
            name: 'Manhattan',
            type: 'line',
            smooth: true,
            data: [26.3, 27, 27.8, 30.3, 25.3, 27, 25.8, 28.8, 27.9],
        },

        {
            name: 'Queens',
            type: 'line',
            smooth: true,
            data: [31.6, 32.4, 32.4, 34, 30.8, 31.5, 32.2, 30.5, 30.9],
        },

        {
            name: 'Staten Island',
            type: 'line',
            smooth: true,
            data: [31.3, 31.4, 32.6, 35.1, 28.5, 29.8, 29.3, 28.6, 29.5],
        },

        {
            name: 'Citywide',
            type: 'line',
            smooth: true,
            data: [31, 31.4, 31.8, 33.8, 29.5, 30.6, 30.6, 29.9, 30.2],
        }
    ],

    'NO2': [
        {
            name: 'Bronx',
            type: 'line',
            smooth: true,
            data: [19.9, 19.8, 20, 18.4, 19.4, 17.7, 16, 17.1, 16.5],
        },

        {
            name: 'Brooklyn',
            type: 'line',
            smooth: true,
            data: [19.9, 19.9, 19.3, 18.5, 18.5, 17.8, 16.5, 16, 16.7],
        },

        {
            name: 'Manhattan',
            type: 'line',
            smooth: true,
            data: [28, 26.7, 25.2, 24.4, 24.6, 23.4, 21.7, 20.5, 20],
        },

        {
            name: 'Queens',
            type: 'line',
            smooth: true,
            data: [18.7, 18.9, 18.5, 17.6, 17.8, 17.2, 15.7, 14.8, 15.5],
        },

        {
            name: 'Staten Island',
            type: 'line',
            smooth: true,
            data: [13.8, 14.2, 13.7, 13.5, 13.4, 12.9, 11.9, 11.6, 12.8],
        },

        {
            name: 'Citywide',
            type: 'line',
            smooth: true,
            data: [18.8, 18.9, 18.4, 17.6, 17.8, 17, 15.6, 15.2, 15.7],
        }
    ],

    'NOx': [
        {
            name: 'Bronx',
            type: 'line',
            smooth: true,
            data: [17.6, 20.6, 18.1, 15.4, 13.6, 12.3, 11.7, 11.1, 11.5],
        },

        {
            name: 'Brooklyn',
            type: 'line',
            smooth: true,
            data: [16.7, 20.8, 18.5, 17.4, 14.6, 13.5, 11.4, 12, 12.7],
        },

        {
            name: 'Manhattan',
            type: 'line',
            smooth: true,
            data: [30.4, 35.1, 28.9, 23.6, 20.9, 19.6, 14.3, 13.8, 13],
        },

        {
            name: 'Queens',
            type: 'line',
            smooth: true,
            data: [16.5, 19, 17.8, 15.7, 12.5, 11.1, 11.1, 11.3, 11.6],
        },

        {
            name: 'Staten Island',
            type: 'line',
            smooth: true,
            data: [11.3, 12.3, 11.1, 10.5, 8.2, 7.6, 7.2, 7.8, 9],
        },

        {
            name: 'Citywide',
            type: 'line',
            smooth: true,
            data: [16.7, 19.5, 17.5, 15.6, 12.9, 11.7, 10.7, 10.9, 11.4],
        }
    ]
};


// Line Chart
function drawLineChart(pollutantType) {
    const chartWidth = elLineChart.offsetWidth;

    elLineChart.style.width = chartWidth + 'px';
    elLineChart.style.height = chartWidth + 'px';

    const lineChart = echarts.init(elLineChart, {
        width: chartWidth * 0.8,
        height: chartWidth * 0.76,
    });

    const option = {
        title: null,

        tooltip: {
            trigger: "axis",
        },

        grid: {
            left: '5%',
            containLabel: true
        },

        legend: {
            data: ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island", "Citywide"],
            orient: 'horizontal',
            textStyle: {
                fontSize: '10',
            },
        },

        xAxis: {
            type: "category",
            boundaryGap: false,
            name: "Year",
            data: [
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
            ],
            nameLocation: 'center',
            nameTextStyle: {
                align: 'center',
                verticalAlign: 'top',
                padding: [10, 0, 0, 0],
            }
        },

        yAxis: {
            type: "value",
            name: "ppb",
            nameLocation: 'center',
            nameTextStyle: {
                align: 'center',
                verticalAlign: 'bottom',
                padding: [0, 0, 10, 0],
            }
        },

        series: seriesList[pollutantType],
    };

    lineChart.setOption(option);
}
