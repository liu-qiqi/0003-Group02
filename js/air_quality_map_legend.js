
const elLegend = document.getElementById("legend");

const colors = [
    '#FFEDA0',
    '#FED976',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#BD0026',
    '#800026'
];

// Paint color array
const getColorLabelsByLayer = function (layer) {
   switch (layer) {
     case "PM2_5":
       return [
           '05.32 ~ 06.33',
           '06.33 ~ 06.73',
           '06.73 ~ 07.16',
           '07.16 ~ 07.69',
           '07.69 ~ 08.25',
           '08.25 ~ 08.86',
           '08.86 ~ 09.49',
           '09.49 ~ 14.26'
       ]
     case "NO2":
        return [
           '09.94 ~ 15.39',
           '15.39 ~ 16.91',
           '16.91 ~ 18.07',
           '18.07 ~ 19.04',
           '19.04 ~ 20.08',
           '20.08 ~ 21.24',
           '21.24 ~ 22.84',
           '22.84 ~ 38.71'
       ]
     case "NOx":
        return [
           '06.43 ~ 10.42',
           '10.42 ~ 11.95',
           '11.95 ~ 13.59',
           '13.59 ~ 15.28',
           '15.28 ~ 16.72',
           '16.72 ~ 18.73',
           '18.73 ~ 22.34',
           '22.34 ~ 47.80'
       ]
     case "O3":
        return [
           '20.67 ~ 27.70',
           '27.70 ~ 28.94',
           '28.94 ~ 29.68',
           '29.68 ~ 30.32',
           '30.32 ~ 30.81',
           '30.81 ~ 31.62',
           '31.62 ~ 32.64',
           '32.64 ~ 38.26'
       ]
     default:
       break;
   }
}

function drawLegend(layer) {
    // Color bar
    const ctx = elLegend.getContext("2d");

    ctx.clearRect(0, 0, elLegend.width, elLegend.height);

    const colorLabels = getColorLabelsByLayer(layer);

    ctx.font = "12px 'Helvetica Neue'";

    const colorBlockX = 11.5;
    const colorBlockW = 14;
    const colorBlockH = 14;

    for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        const colorLabel = colorLabels[i];

        const colorBlockY = elLegend.height - i * 15 - 20;
        const labelX = colorBlockX + 20;
        const labelY = colorBlockY + colorBlockH / 2 + 1;

        ctx.fillStyle = color;
        ctx.fillRect(colorBlockX, colorBlockY, colorBlockW, colorBlockH);

        ctx.fillStyle = "#000";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(colorLabel, labelX, labelY);
    }

    ctx.fillStyle = "#000";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText('UNIT: ppb', colorBlockX + 20, 12);

    ctx.beginPath();
    ctx.lineWidth = 0.25;
    ctx.setLineDash([5, 1]);
    ctx.moveTo(5, 15 + 6);
    ctx.lineTo(elLegend.width - 5, 15 + 6)
    ctx.stroke();
}
