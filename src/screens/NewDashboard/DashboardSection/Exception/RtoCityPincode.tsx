import React from 'react';
import { CustomTable } from '../../../../components/Table/index';

const RtoCityPincode = () => {
  const columns = [
    {
      header: 'City',
      accessorKey: 'city',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Pincode',
      accessorKey: 'pincode',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'RTO Count',
      accessorKey: 'rtoCount',
      cell: (info: any) => info.getValue(),
    },
    {
      header: 'Percentage',
      accessorKey: 'percentage',
      cell: (info: any) => `${info.getValue()}%`,
    }
  ];

  const data = [
    {
      city: 'Kolkata',
      pincode: '700156',
      rtoCount: 5,
      percentage: 5
    },
    {
      city: 'Kolkata',
      pincode: '700156',
      rtoCount: 18,
      percentage: 8
    },
    {
      city: 'Kolkata',
      pincode: '700156',
      rtoCount: 12,
      percentage: 9
    },
    {
      city: 'Kolkata',
      pincode: '700156',
      rtoCount: 8,
      percentage: 5
    },
    {
      city: 'Kolkata',
      pincode: '700156',
      rtoCount: 5,
      percentage: 3
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="border-b p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 font-semibold text-lg">
              RTO in Cities and Pin codes
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

export default RtoCityPincode;