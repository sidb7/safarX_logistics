import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import DarkstoreTable from "./DarkstoreTable";
import { GET } from "../../utils/webService";
import { GET_DARKSTORE_PRODUCT_COUNT } from "../../utils/ApiUrls";
import AccessDenied from "../../components/AccessDenied";
function DarkstoreInventory() {
  const [totalProducts, setTotalProducts] = useState({
    product_name: 0,
    dark_store: 0,
  });
  const [darkstoreEnable, setDarkstoreEnable] = useState<boolean | string>(
    true
  );

  useEffect(() => {
    const fetchTotalProductCount = async () => {
      try {
        const isDarkStoreEnable =
          sessionStorage.getItem("isDarkStoreEnable") === "true";
        setDarkstoreEnable(isDarkStoreEnable);

        if (!isDarkStoreEnable) {
          return;
        }

        const { data } = await GET(GET_DARKSTORE_PRODUCT_COUNT);

        setTotalProducts({
          product_name: data?.data[0]?.product_name || 0,
          dark_store: data?.data[0]?.dark_store || 0,
        });
      } catch (err) {
        console.log("ERROR: ", err);
      }
    };
    fetchTotalProductCount();
  }, []);
  return (
    <div>
      {darkstoreEnable ? (
        <>
          <Breadcrum label="Dark Store Inventory" />
          <div className="flex flex-col md:flex-row gap-4 px-[20px]">
            <div className="w-full md:w-1/2 border border-gray-200 shadow-md rounded-lg px-4 py-3">
              <h2 className="text-lg mb-1 font-Open text-[#494949] ">
                Total Products
              </h2>
              <p className="text-xl font-bold mb-1">
                {totalProducts.product_name}
              </p>
              <p className="text-sm font-Open text-[#8D8D8D] leading-5">
                Across all dark stores
              </p>
            </div>

            <div className="w-full md:w-1/2 border border-gray-200 shadow-md rounded-lg px-4 py-3">
              <h2 className="text-lg mb-1 font-Open text-[#494949] ">
                Dark stores
              </h2>
              <p className="text-xl font-bold mb-1">
                {totalProducts.dark_store}
              </p>
              <p className="text-sm text-[#8D8D8D] font-Open leading-5">
                Active Locations
              </p>
            </div>
          </div>
          <div className="px-[20px]">
            <DarkstoreTable />
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}

export default DarkstoreInventory;
