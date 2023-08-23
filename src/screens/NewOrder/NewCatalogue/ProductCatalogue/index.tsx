import React, { useState } from "react";
import PaginationComponent from "../../../../components/Pagination";

const ProductCatalogue = () => {
  const [filterId, setFilterId] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(10);

  const [filterData, setFilterData] = useState([
    { label: "Single Product", isActive: false },
    { label: "Combo Product", isActive: false },
  ]);

  //on page change index
  const onPageIndexChange = () => {};

  // on per page item change
  const onPerPageItemChange = () => {};

  const filterComponent = (className?: string) => {
    return (
      <div
        className={`flex mt-6 text-[14px] text-[#777777] font-medium h-[44px]`}
      >
        {filterData.map((singleData, index) => {
          return (
            <span
              className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                filterId === index
                  ? `${
                      index === filterData.length - 1
                        ? "rounded-r-md"
                        : "rounded-l-md"
                    } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                  : ""
              }`}
              onClick={() => setFilterId(index)}
            >
              {singleData.label}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {filterComponent()}

      {/* Display Address */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-0 mt-4"></div>
      <div className="absolute bottom-24">
        {totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={onPageIndexChange}
            onItemsPerPageChange={onPerPageItemChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;
