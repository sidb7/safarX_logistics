import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const CourierAndAttempts = () => {
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
        columnWidth: '35%',
        borderRadius: 0,
        dataLabels: {
          position: 'top'
        }
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Bluedart', 'DHL', 'Ekart', 'Maruti', 'Delhivery', 'DTDC'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: ''
      },
      min: 0,
      max: 100,
      tickAmount: 5
    },
    fill: {
      opacity: 1
    },
    colors: ['#82CD7D', '#FF6B4E'], 
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
        right: 20,
        bottom: 0,
        left: 20
      }
    }
  };

  const series = [
    {
      name: 'Total Exception',
      data: [58, 63, 64, 63, 58, 63]
    },
    {
      name: 'Total Attempts',
      data: [78, 68, 85, 98, 58, 98]
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="border-b p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-semibold text-lg">
              Courier and Attempts
            </span>
          </div>
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Select Partner</option>
          </select>
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

export default CourierAndAttempts;