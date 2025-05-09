import React from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import DarkstoreTable from "./DarkstoreTable";

function DarkstoreInventory() {
  return (
    <div>
      <Breadcrum label="Dark Store Inventory" />
      <div className="flex flex-col md:flex-row gap-4 px-[20px]">
        <div className="w-full md:w-1/2 border border-gray-200 shadow-md rounded-lg px-4 py-6">
          <h2 className="text-lg mb-2">Total all Darkstores</h2>
          <p className="text-xl font-bold mb-1">20,000</p>
          <p className="text-md text-gray-600">Across all darkstores</p>
        </div>

        <div className="w-full md:w-1/2 border border-gray-200 shadow-md rounded-lg px-4 py-6">
          <h2 className="text-lg font-semibold mb-2">Charges</h2>
          <p className="text-lg font-bold mb-1">₹ 20,000</p>
          <p className="text-sm text-gray-600">
            Along with all other darkstore
          </p>
        </div>
      </div>
      <div className="px-[20px]">
        <DarkstoreTable />
      </div>
    </div>
  );
}

export default DarkstoreInventory;
