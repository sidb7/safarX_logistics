import React from 'react';
import { CustomTable } from '../../../../components/Table/index';


const TopRtoCustomer = () => {
  const columns = [
    {
      header: 'Customer',
      accessorKey: 'customer',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Order Count',
      accessorKey: 'orderCount',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Revenue',
      accessorKey: 'revenue',
      cell: (info: any) => `₹${info.getValue().toLocaleString()}`,
    }
  ];

  const data = [
    {
      customer: 'John Doe',
      orderCount: 145,
      revenue: 28500
    },
    {
      customer: 'Alice Smith',
      orderCount: 132,
      revenue: 24600
    },
    {
      customer: 'Robert Johnson',
      orderCount: 128,
      revenue: 22800
    },
    {
      customer: 'Emily Brown',
      orderCount: 120,
      revenue: 21000
    },
    {
      customer: 'Michael Wilson',
      orderCount: 118,
      revenue: 20500
    },
    {
      customer: 'Sarah Davis',
      orderCount: 115,
      revenue: 19800
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="border-b p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-semibold text-lg">
              Top RTO Customer
            </span>
          </div>
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Select Partner</option>
          </select>
        </div>
      </div>
      <div className="p-4">
        <CustomTable 
          data={data}
          columns={columns}
          tdclassName="py-3 text-sm text-gray-600"
          thclassName="py-3 text-sm"
        />
      </div>
    </div>
  );
};

export default TopRtoCustomer;