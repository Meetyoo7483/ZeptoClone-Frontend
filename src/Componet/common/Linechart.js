// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';

// const Linechart = () => {
//     const [state] = useState({
//         series: [
//             {
//                 name: 'Performance',
//                 data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
//             },
//         ],
//         options: {
//             chart: {
//                 type: 'line',
//                 toolbar: {
//                     show: true,
//                     tools: {
//                         download: true,
//                         selection: false,
//                         zoom: false,
//                         zoomin: false,
//                         zoomout: false,
//                         pan: false,
//                         reset: false,
//                     },
//                 },
//                 foreColor: '#fff',
//                 animations: {
//                     enabled: true,
//                     easing: 'easeinout',
//                     speed: 800,
//                 },
//             },
//             stroke: {
//                 curve: 'smooth',
//                 width: 3,
//                 colors: ['#fff'],
//             },
//             markers: {
//                 size: 0,
//                 colors: ['#fff'],
//                 strokeColors: ['#fff'],
//                 strokeWidth: 2,
//                 discrete: [
//                     { seriesIndex: 0, dataPointIndex: 2, fillColor: '#fff', size: 6 },
//                     { seriesIndex: 0, dataPointIndex: 5, fillColor: '#fff', size: 6 },
//                     { seriesIndex: 0, dataPointIndex: 8, fillColor: '#fff', size: 6 },
//                 ],
//             },
//             grid: {
//                 show: false,
//             },
//             xaxis: {
//                 categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//                 labels: {
//                     style: {
//                         colors: '#fff',
//                     },
//                 },
//             },
//             yaxis: {
//                 show: false,
//                 labels: {
//                     style: {
//                         colors: '#fff',
//                     },
//                 },
//             },
//             title: {
//                 text: "Order of Every Month",
//                 style: {
//                     fontWeight: 'bold',
//                     color: '#fff',
//                     fontSize: '16px',
//                 }
//             },
//             tooltip: {
//                 theme: 'dark',
//             },
//             responsive: [
//                 {
//                     breakpoint: 768,
//                     options: {
//                         chart: {
//                             height: 300,
//                         },
//                     },
//                 },
//                 {
//                     breakpoint: 480,
//                     options: {
//                         chart: {
//                             height: 250,
//                         },
//                         markers: {
//                             size: 4,
//                         }
//                     },
//                 }
//             ]
//         },
//     });

//     return (
//         <div className="w-full max-w-full border border-gray-400 rounded-md">
//             <ReactApexChart
//                 options={state.options}
//                 series={state.series}
//                 type="line"
//                 height="250px"
//                 width="500px"
//             />
//         </div>
//     );
// };

// export default Linechart;
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const Linechart = () => {
  const [state] = useState({
    series: [
      { name: 'Performance', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
    ],
    options: {
      chart: {
        type: 'line',
        toolbar: { show: true, tools: { download: true, selection: false, zoom: false, zoomin: false, zoomout: false, pan: false, reset: false }},
        foreColor: '#fff',
        animations: { enabled: true, easing: 'easeinout', speed: 800 },
      },
      stroke: { curve: 'smooth', width: 3, colors: ['#fff'] },
      markers: {
        size: 0, colors: ['#fff'], strokeColors: ['#fff'], strokeWidth: 2,
        discrete: [
          { seriesIndex: 0, dataPointIndex: 2, fillColor: '#fff', size: 6 },
          { seriesIndex: 0, dataPointIndex: 5, fillColor: '#fff', size: 6 },
          { seriesIndex: 0, dataPointIndex: 8, fillColor: '#fff', size: 6 },
        ],
      },
      grid: { show: false },
      xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'], labels: { style: { colors: '#fff' }}},
      yaxis: { show: false, labels: { style: { colors: '#fff' }}},
      title: { text: "Order of Every Month", style: { fontWeight: 'bold', color: '#fff', fontSize: '16px' }},
      tooltip: { theme: 'dark' },
      responsive: [
        { breakpoint: 768, options: { chart: { height: 300 } }},
        { breakpoint: 480, options: { chart: { height: 250 }, markers: { size: 4 } }},
      ],
    },
  });

  return (
    <div className="w-full max-w-full border border-gray-500 rounded-xl py-1">
      <ReactApexChart options={state.options} series={state.series} type="line" height="300px" width="100%" />
    </div>
  );
};

export default Linechart;
