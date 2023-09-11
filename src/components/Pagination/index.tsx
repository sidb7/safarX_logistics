import React, { useState } from "react";
import CustomDropDown from "../DropDown";

interface PaginationProps {
  totalItems: number;
  itemsPerPageOptions: number[];
  onPageChange: any;
  onItemsPerPageChange: any;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange({ currentPage: pageNumber, itemsPerPage });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    let temp = Number(event.target.value);
    setCurrentPage(1);
    onItemsPerPageChange({ currentPage, itemsPerPage: temp });
  };

  return (
    <div className="lg:flex hidden justify-between items-center space-x-4 mx-8">
      <div className="flex items-center gap-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from(Array(totalPages).keys())?.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-2 py-1 border rounded-md ${
              currentPage === page + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
      <div className="flex items-center gap-x-2 ">
        <div className="flex items-center gap-x-2">
          <p>Items per page</p>
          <CustomDropDown
            options={itemsPerPageOptions?.map((option) => ({
              label: option,
              value: option,
            }))}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            selectClassName="!h-[38px] "
          />
        </div>
        <p>
          Item {(currentPage - 1) * itemsPerPage} to{" "}
          {currentPage * itemsPerPage > totalItems
            ? totalItems
            : currentPage * itemsPerPage}{" "}
          of {totalItems}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
