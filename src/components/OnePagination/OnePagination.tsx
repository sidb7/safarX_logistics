import React, { useState } from "react";
import CustomDropDown from "../DropDown";

interface OnePaginationProps {
  totalItems: number;
  itemsPerPageOptions: number[];
  onPageChange: any;
  onItemsPerPageChange: any;
  pageNo?: number;
  initialItemsPerPage?: number;
  className?: string;
  rightmodalPagination?: boolean;
}

const OnePagination: React.FC<OnePaginationProps> = ({
  totalItems,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
  rightmodalPagination = false,
  pageNo = 1,
  className = "",
  initialItemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(pageNo);
  const [itemsPerPage, setItemsPerPage] = useState(
    initialItemsPerPage || itemsPerPageOptions[0]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange({ currentPage: pageNumber, itemsPerPage });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newItemsPerPage = Number(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    onItemsPerPageChange({ currentPage: 1, itemsPerPage: newItemsPerPage });
  };

  const renderPageNumbers = () => {
    // Always show exactly 7 slots for page numbers/ellipsis
    const visibleSlots = 7;
    let pages: (number | '...')[] = [];

    if (totalPages <= visibleSlots) {
      // If total pages is less than visible slots, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always show first and last page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near start: show 1, 2, 3, 4, 5, ..., totalPages
        pages.push(2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end: show 1, ..., totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        pages.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle: show 1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return (
      <div className="flex items-center gap-2">
        {pages.map((page, index) => (
          <button
            key={`page-${index}`}
            onClick={() => typeof page === 'number' ? handlePageChange(page) : undefined}
            disabled={page === '...'}
            className={`w-10 h-10 flex items-center justify-center rounded-md ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : page === '...'
                ? "bg-gray-100 cursor-default"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`${
        rightmodalPagination
          ? "flex flex-col gap-4"
          : "lg:grid grid-cols-2 justify-end items-center"
      } ${className} mt-8 mx-8 mb-20`}
    >
      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
        >
          &lt;
        </button>
        {renderPageNumbers()}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>
      <div
        className={`flex items-center ${
          rightmodalPagination ? "" : "justify-end"
        }`}
      >
        <div className="flex items-center gap-x-2 mr-10">
          <p className="font-normal text-sm text-[#323232]">Items per page</p>
          <CustomDropDown
            options={itemsPerPageOptions?.map((option) => ({
              label: option,
              value: option,
            }))}
            onChange={handleItemsPerPageChange}
            value={itemsPerPage}
            selectClassName="!h-[38px]"
          />
        </div>
        <p className="font-semibold text-sm text-[#A4A4A4]">
          Item {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
        </p>
      </div>
    </div>
  );
};

export default OnePagination;


