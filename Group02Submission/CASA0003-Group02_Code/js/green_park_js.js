let hoveredFeatureName = null;
mapboxgl.accessToken = 'pk.eyJ1IjoibHVjaWZpbmlseCIsImEiOiJjbGhjMDlhb20wMnh2M2xtaGd6MHQ1ODF3In0.ak7zoOAdueYRii-DbyVflg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-73.9350, 40.7300],
    zoom: 11

});

const geocoder = new MapboxGeocoder({
    accessToken: 'pk.eyJ1IjoibHVjaWZpbmlseCIsImEiOiJjbGhjMDlhb20wMnh2M2xtaGd6MHQ1ODF3In0.ak7zoOAdueYRii-DbyVflg',
    mapboxgl: mapboxgl,
    placeholder: 'Search for Park by Name',
    countries: 'us',
    bbox: [-74.2591, 40.4774, -73.7004, 40.9176] // Optional: Add bounding box for New York City
});

map.addControl(geocoder, 'top-right');
geocoder.on('result', (e) => {
    map.flyTo({
        center: e.result.geometry.coordinates,
        zoom: 16
    });
});


//先添加搜索框再添加导航栏，这样导航栏就出现在搜索框下方。
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right'); // 将导航控件添加到地图的右上角

function getYearFromSliderValue(sliderValue) {
    const years = [2000, 2004, 2008, 2012, 2016, 2020, 2024];
    return years[sliderValue];
}

function createColorAxis() {
    const colors = [{
        year: 1686,
        color: '#43C680'
    }, {
        year: 2000,
        color: '#E48802'
    }, {
        year: 2004,
        color: '#EE2FB4'
    }, {
        year: 2008,
        color: '#EE462F'
    }, {
        year: 2012,
        color: '#076DE1'
    }, {
        year: 2016,
        color: '#A006F2'
    }, {
        year: 2020,
        color: '#CDCA06'
    }, {
        year: 2024,
        color: ''
    }, ];

    const colorScaleDiv = document.getElementById('color-scale');
    const yearScaleDiv = document.getElementById('year-scale');

    colors.forEach((item) => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = item.color;
        colorScaleDiv.appendChild(colorDiv);

        const yearSpan = document.createElement('span');
        yearSpan.textContent = item.year;
        yearScaleDiv.appendChild(yearSpan);
    });
}





map.on('load', () => {
    map.addSource('polygons', {
        'type': 'geojson',
        'data': './data/green_park_polygons.geojson' // 替换为您的GeoJSON文件的URL
    });

    map.addLayer({
        'id': 'polygons-fill',
        'type': 'fill',
        'source': 'polygons',
        'layout': {},
        'paint': { //公园绿色填充
            'fill-color': [
                'step', ['number', ['get', 'year']],
                '#43C680', // 默认颜色，对应 0-1999 年的公园
                2000, '#E48802 ', //2000-2003
                2004, '#EE2FB4', //2004-2007
                2008, '#EE462F ', //2008-2011
                2012, '#076DE1', //2012-2015
                2016, '#A006F2', //2016-2019
                2020, '#CDCA06' //2020-
            ],

            'fill-opacity': 0.7
        }

    });

    map.addLayer({
        'id': 'polygons-fill-hover',
        'type': 'fill',
        'source': 'polygons',
        'layout': {},
        'paint': {
            'fill-color': '#20229D', // 鼠标悬停蓝色填充
            'fill-opacity': 0.9
        },
        'filter': ['==', 'SIGNNAME', '']
    });
    //这样地图加载完成后，就会立即根据滑块的初始位置更新公园的可见性。
    updateParkVisibility(getYearFromSliderValue(slider.value));

    // 开始时间轴动画
    toggleAnimation();

    // 添加一个颜色刻度轴
    createColorAxis();


});

//更新滑块事件监听器中的年份计算
document.getElementById('slider').addEventListener('input', (e) => {
    const year = parseInt(e.target.value) * 4 + 2000;
    document.getElementById('year2').textContent = year;
    updateParkVisibility(year);
});




// 当鼠标悬停在图层上时
map.on('mouseenter', 'polygons-fill', (e) => {
    // 改变鼠标样式
    map.getCanvas().style.cursor = 'pointer';

    // 获取公园名称
    const parkName = e.features[0].properties.SIGNNAME; // 确保CSV文件中的列名为'SIGNNAME'

    // 显示公园名称
    const parkNameDiv = document.getElementById('park-name');

    parkNameDiv.innerHTML = " <span style='color: #E67DBA'>" + parkName + "</span>";
    parkNameDiv.style.display = 'block';

    // 获取公园属性
    const propertyType = e.features[0].properties.TYPECATEGORY; // 确保GEOJSON文件中的列名为
    // 显示公园属性 Property-Type
    const propertyTypeDiv = document.getElementById('Property-Type');

    propertyTypeDiv.innerHTML = "Property Type: <span style='color: #E67DBA'>" + propertyType + "</span>";
    propertyTypeDiv.style.display = 'block';

    //获取公园面积ACRES
    const acres = e.features[0].properties.ACRES; // 确保GEOJSON文件中的列名为
    // 显示公园面积
    const acresDiv = document.getElementById('ACRES');
    acresDiv.innerHTML = "Size of the park property in acres: <span style='color: #E67DBA'>" + acres + "</span>";

    // 获取公园Url
    const url = e.features[0].properties.URL; // 确保GROJSON文件中的列名为'URL

    // 显示公园Url
    const urlDiv = document.getElementById('URL-2');
    urlDiv.href = url;
    urlDiv.textContent = 'Visit ' + parkName + ' Website';
    urlDiv.style.color = '#E67DBA';


    // 改变公园颜色
    hoveredFeatureName = parkName;
    map.setFilter('polygons-fill-hover', ['==', 'SIGNNAME', hoveredFeatureName]);
});
// 当鼠标离开图层时
map.on('mouseleave', 'polygons-fill', () => {
    // 恢复鼠标样式
    map.getCanvas().style.cursor = '';

    // 隐藏公园名称，这里注释掉了现在保留上次悬停之后的公园信息
    // const parkNameDiv = document.getElementById('park-name');
    // parkNameDiv.innerHTML = "Hover over a Park";

    // 恢复原本的公园颜色
    if (hoveredFeatureName !== null) {
        map.setFilter('polygons-fill-hover', ['==', 'SIGNNAME', '']);
        hoveredFeatureName = null;
    }
});


//时间轴
//时间轴移动到2004年时，year=2004的公园会标注成2008的颜色。
//解决方案是把函数updateParkVisibility中所有的‘<=’改为‘<’.
//目前时间轴移动到2004时，只显示新增的2000，2001,2002,2003年的公园，显示为橘色（只有一个颜色）
function updateParkVisibility(year) {
    map.setFilter('polygons-fill', ['<', 'year', year]);
    if (hoveredFeatureName !== null) {
        map.setFilter('polygons-fill-hover', ['all', ['<', 'year', year],
            ['==', 'SIGNNAME', hoveredFeatureName]
        ]);
    } else {
        map.setFilter('polygons-fill-hover', ['all', ['<', 'year', year],
            ['==', 'SIGNNAME', '']
        ]);
    }
}


//修改的时间轴动画
let animationInterval;
let isAnimating = false;

let isFlytoAnimating = false;

let popup = new mapboxgl.Popup();

function animateSlider() {
    if (!isAnimating) {
        return;
    }

    let slider = document.getElementById('slider');
    let sliderValue = parseInt(slider.value);

    if (sliderValue < parseInt(slider.max)) {
        sliderValue++;
    } else {
        sliderValue = parseInt(slider.min);
    }

    slider.value = sliderValue;
    const year = getYearFromSliderValue(slider.value);
    document.getElementById('year2').textContent = year;
    updateParkVisibility(year);

    //flyto动画点了start时
    if (isFlytoAnimating) {
        if (parkData[year]) {
            const park = parkData[year];
            map.flyTo({
                center: [park.lng, park.lat],
                zoom: 12.8
            });
            popup.setLngLat([park.lng, park.lat])
                .setHTML(`
<div style="color: #F9A094; ">
<h2>${park.name}</h2>
<p>Year Established: ${park.year}</p>
<p>${park.des}</p>
${park.img ? `<img src="${park.img}" alt="img" style="width: 200px; height: auto;">` : ''}
</div>
`)
.addTo(map);



        }

    }

    animationInterval = setTimeout(animateSlider, 1600);
}

function updateYearAndParkVisibility() {
    let slider = document.getElementById('slider');
    const year = getYearFromSliderValue(slider.value);
    document.getElementById('year2').textContent = year;
    updateParkVisibility(year);
}

document.getElementById('slider').addEventListener('input', (e) => {
    updateYearAndParkVisibility();

    // 如果动画正在播放，停止当前动画并立即重新开始
    if (isAnimating) {
        clearTimeout(animationInterval);
        animateSlider();
    }
});

// 添加一个开关动画的函数
function toggleAnimation() {
    isAnimating = !isAnimating;
    const animationButton = document.getElementById('animationButton');

    if (isAnimating) {
        animateSlider();
        animationButton.textContent = 'Stop';
    } else {
        clearTimeout(animationInterval);
        animationButton.textContent = 'Start';

    }
}

// 添加一个开关flyto动画的函数
function flyToAnimation() {
    //开始时isFlytoAnimating为false
    //点击按钮触发这个函数isFlytoAnimating为ture
    isFlytoAnimating = !isFlytoAnimating;
    const flytoAnimationButton = document.getElementById('flytoAnimationButton');

    //只有当时间轴变化isAnimating=true时点击FlyTo Start 按钮才会变成stop.
    //时间轴stop时，点击FlyTo Start 按钮没有效果
    if (isFlytoAnimating && isAnimating) {

        flytoAnimationButton.textContent = 'FlyTo Stop';
    } 
    //修复了点击时间轴stop后，点击flyto start后再点击时间轴start后flyto自动开启的bug
    else if(isAnimating===false&& isFlytoAnimating===true){
        isFlytoAnimating = false;
        flytoAnimationButton.textContent = 'FlyTo Start';
    }
    else {

        flytoAnimationButton.textContent = 'FlyTo Start';
        //点了stop之后，把地图缩小
        map.flyTo({
            center: [-73.9350, 40.7300],
            zoom: 11
        });
        //关闭popup
        popup.remove();
    }
}

const parkData = {
    2004: {
        name: "Brooklyn Bridge Park",
        lat: 40.692343292350614,
        lng: -74.000326329254023,
        img: "https://www.nycgovparks.org/photo_gallery/full_size/23697.jpg",
        year: 2001,
        des: "This treasure of a park offers breathtaking views of Lower Manhattan’s panoramic skyline and the New York Harbor.",


    },
    2008: {
        name: "Bushwick Inlet Park",
        lat: 40.72529522383293,
        lng: -73.961676276079459,
        year: 2007,
        des: 'Bushwick Inlet Park is the centerpiece of the Greenpoint-Williamsburg Waterfront.',
        img: 'https://www.nycgovparks.org/photo_gallery/full_size/24722.jpg',
    },
    2012: {
        name: "North 5th Street Pier and Park",
        lat: 40.720819938170763,
        lng: -73.964076507013516,
        year: 2008,
        img: 'https://www.nycgovparks.org/photo_gallery/full_size/24466.jpg',
        des: "With spectacular views of the East River, and easy access to the North Williamsburg NYC Ferry stop, this park is a popular destination for photo seekers."

    },
    2016: {
        name: "Jacob's Ladder Playground",
        lat: 40.704965008097162,
        lng: -73.9666338343863,
        img: 'https://www.nycgovparks.org/photo_gallery/full_size/18984.jpg',
        year: 2012,
        des: "Parks acquired two parcels in the target area and developed plans for two different recreation facilities, one for active play and one for passive enjoyment. ",


    },
    2020: {
        name: "Greenpoint Landing",
        lat: 40.737762120042802,
        lng: -73.958522398745188,
        year: 2018,
        img: 'https://greenpointlanding.com/wp-content/uploads/2021/02/201105_LR_2BS_Exteriors_0001@2x.jpg',
        des: 'Located in Greenpoint, one of Brooklyn’s most vibrant neighborhoods.',



    },
    2024: {
        name: "Park",
        lat: 40.732023638675805,
        lng: -73.961619144335188,
        year: 2022,
        img: '',
        des: '',
    }
};