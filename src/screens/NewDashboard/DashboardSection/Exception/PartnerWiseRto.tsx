import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const PartnerWiseRto = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      fontFamily: 'inherit'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 0
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Exceptions per 100 Orders'
      },
      min: 0,
      max: 10,
      tickAmount: 5
    },
    fill: {
      opacity: 1
    },
    colors: ['#3371FF', '#7CCA62', '#F57960'], 
    legend: {
      position: 'bottom', 
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 8
    },
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      }
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          return val + " per 100 orders"
        }
      }
    }
  };

  const series = [
    {
      name: 'Bluedart',
      data: [8.7, 6.3, 5.0, 6.4, 5.0, 6.4, 4.8]
    },
    {
      name: 'Dart Plus',
      data: [5.2, 3.8, 3.3, 7.1, 6.2, 3.8, 7.1]
    },
    {
      name: 'Ekart',
      data: [6.5, 4.7, 8.2, 4.7, 6.9, 4.7, 3.5]
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="">
        {/* <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Partner Wise Exception <span className='font-sans text-xs font-normal leading-4 text-gray-400'>(per 100 Orders)</span>
          </h2>
          <select className="border rounded-md px-2 py-1 text-sm bg-white">
            <option>Select Partner</option>
          </select>
        </div> */}
        
        <div className="border-b p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-semibold text-sm">
             Partner Wise RTO <span className='font-sans text-xs font-normal leading-4 text-gray-400'>(per 100 Orders)</span>
            </span>
          </div>
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Last Year</option>
          </select>
        </div>
      </div>




      </div>
      <div className="p-4">
        <div className="h-[400px] w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerWiseRto;