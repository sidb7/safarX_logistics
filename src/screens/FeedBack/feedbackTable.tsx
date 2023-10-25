import React, { useState } from 'react'
import { capitalizeFirstLetter } from '../../utils/utility';
import { createColumnHelper } from '@tanstack/react-table';
import { CustomTable } from '../../components/Table';
import { date_DD_MMM_YYY } from '../../utils/dateFormater';
import Pagination from "../../components/Pagination";

function FeedbackTable({ feedbackDataList, totalItemCount }: any) {


    const onPageIndexChange = async (data: any) => {
        let skip: any = 0;
        let limit: any = 0;
        let pageNo: any = 0;

        if (data?.currentPage === 1) {
            skip = 0;
            limit = data?.itemsPerPage;
            pageNo = 1;
        } else {
            skip = (data?.currentPage - 1) * data?.itemsPerPage;
            limit = data?.itemsPerPage;
            pageNo = data?.currentPage || 0;
        }

        const paginationData: any = {
            pageNo,
            skip,
            limit
        }

        feedbackDataList(paginationData)
    };

    const onPerPageItemChange = async (data: any) => {
        let skip: any = 0;
        let limit: any = 0;
        let pageNo: any = 0;

        if (data?.currentPage === 1) {
            skip = 0;
            limit = data?.itemsPerPage;
            pageNo = 1;
        } else {
            skip = 0;
            limit = data?.itemsPerPage;
            pageNo = data?.currentPage || 0;
        }

        const paginationData: any = {
            pageNo,
            skip,
            limit
        }

        feedbackDataList(paginationData);
    };


    const columnsHelper = createColumnHelper<any>();
    const columns = [
        columnsHelper.accessor("name", {
            header: () => {
                return (
                    <div className="flex justify-between items-center text-left min-w-[200px]">
                        <div>
                            <h1 className="text-sm font-semibold leading-5">Full Name</h1>
                        </div>

                    </div>
                );
            },
            cell: (info: any) => {
                const { original } = info.row
                return (
                    <div className="whitespace-nowrap px-2 my-4 space-y-2">
                        {original.fullName}
                    </div>
                );
            },
        }),
        columnsHelper.accessor("email", {
            header: () => {
                return (
                    <div className="flex justify-between items-center text-left min-w-[200px]">
                        <h1 className="text-sm font-semibold leading-5 ">Email ID</h1>

                    </div>
                );
            },
            cell: (info: any) => {
                return (
                    <div className="flex  whitespace-nowrap">
                        <p className="">{capitalizeFirstLetter(info.getValue())}</p>
                    </div>
                );
            },
        }),
        columnsHelper.accessor("module", {
            header: () => {
                return (
                    <div className="flex justify-between items-center text-left min-w-[220px]">
                        <h1>Module</h1>
                    </div>
                );
            },
            cell: (info: any) => {
                return (
                    <div className="flex">
                        <span>{capitalizeFirstLetter(info.getValue())}</span>
                    </div>
                );
            },
        }),
        columnsHelper.accessor("date", {
            header: () => {
                return (
                    <div className="flex justify-between items-center text-left  min-w-[200px] whitespace-nowrap">
                        <h1 className="text-sm font-semibold leading-5 ">Date</h1>

                    </div>
                );
            },
            cell: (info: any) => {
                const { original } = info.row
                return (
                    <div className="flex whitespace-nowrap ">
                        <span>{date_DD_MMM_YYY(original?.createdAt)}</span>
                    </div>
                );
            },
        }),
        // columnsHelper.accessor("time", {
        //     header: () => {
        //         return (
        //             <div className="flex justify-between items-center text-left min-w-[200px]">
        //                 <h1 className="text-sm font-semibold leading-5 ">Time</h1>

        //             </div>
        //         );
        //     },
        //     cell: (info: any) => {
        //         return <div className="flex px-2 ">{info.getValue()}</div>;
        //     },
        // }),
        columnsHelper.accessor("comments", {
            header: () => {
                return (
                    <div className="flex justify-between items-center text-left min-w-[200px]">
                        <h1 className="text-sm font-semibold leading-5 ">Comments</h1>
                    </div>
                );
            },
            cell: (info: any) => {
                return <div className="flex px-2 ">{info.getValue()}</div>;
            },
        }),
    ];


    return (
        <div>
            <CustomTable
                columns={columns} data={feedbackDataList}
            />

            {totalItemCount > 0 && (
                <Pagination
                    totalItems={totalItemCount}
                    itemsPerPageOptions={[10, 20, 30, 50]}
                    onPageChange={onPageIndexChange}
                    onItemsPerPageChange={onPerPageItemChange}
                />
            )}

        </div>
    )
}

export default FeedbackTable

