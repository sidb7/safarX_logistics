import React, { useState } from "react";
import CustomDropDown from "../DropDown";

interface PaginationProps {
  totalItems: number;
  itemsPerPageOptions: number[];
  onPageChange: any;
  onItemsPerPageChange: any;
  pageNo?: number;
  initialItemsPerPage?: number;
  className?: string;
  rightmodalPagination?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
  rightmodalPagination,
  pageNo,
  className,
  initialItemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = useState(pageNo || 1);
  const [itemsPerPage, setItemsPerPage] = useState(
    initialItemsPerPage || itemsPerPageOptions[0]
  );

  const totalPages: any = Math.ceil(totalItems / itemsPerPage);
  let pageNoId = 0;
  let numOftabs = 3;
  let lastPageNumber = totalPages - 3;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    onPageChange({ currentPage: pageNumber, itemsPerPage });
  };

  const setPageNo = (e: any) => {
    setCurrentPage(parseInt(e.target.textContent));
    onPageChange({ currentPage: parseInt(e.target.textContent), itemsPerPage });
    pageNoId = parseInt(e.target.id);
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
    <div
      className={`${
        rightmodalPagination
          ? "flex flex-col gap-4"
          : "lg:grid grid-cols-2 justify-end items-center space-x-4"
      } ${className} mt-[2rem] mx-[2rem] mb-[5rem]`}
    >
      <div className="flex flex-wrap gap-2 gap-x-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>
        {totalPages < 9 ? (
          Array.from(Array(totalPages).keys())?.map((page: any) => {
            return (
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
            );
          })
        ) : (
          <>
            {Array.from(Array(numOftabs).keys())?.map((page: any) => {
              return (
                <button
                  key={page}
                  id={page}
                  onClick={(e) => setPageNo(e)}
                  className={`px-2 py-1 border rounded-md ${
                    pageNoId == page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {lastPageNumber - currentPage > 4
                    ? currentPage + page
                    : page + 1}
                </button>
              );
            })}
            {Array.from(Array(numOftabs).keys())?.map(() => {
              return (
                <button
                  className={`px-2 py-1 border rounded-md ${"bg-gray-200 hover:bg-gray-300"}`}
                >
                  .
                </button>
              );
            })}
            {Array.from(Array(numOftabs).keys())?.map((page: any) => {
              lastPageNumber = lastPageNumber + 1;
              return (
                <button
                  onClick={() => handlePageChange(lastPageNumber + (page - 2))}
                  className={`px-2 py-1 border rounded-md ${
                    currentPage === lastPageNumber
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {lastPageNumber}
                </button>
              );
            })}
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-2 py-1 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
