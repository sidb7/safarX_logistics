import React, { useState } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import { useLocation } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { CustomTable } from "../../../../components/Table";
import NotFound from "../../../../components/404NotFound/NotFound";

function UsersList() {
  const location = useLocation();
  const { data } = location.state || [];

  const columnsHelper = createColumnHelper<any>();
  const columns = [
    columnsHelper.accessor("sellerId", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1>User ID</h1>
            <div className="cursor-pointer"></div>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),
    columnsHelper.accessor("firstName", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1>User Name</h1>
            <div className="cursor-pointer"></div>
          </div>
        );
      },
      cell: (info: any) => {
        const data = info.cell.row.original;
        return (
          <div>
            {data.firstName} {data.lastName}
          </div>
        );
      },
    }),
    columnsHelper.accessor("email", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1>Email</h1>
            <div className="cursor-pointer"></div>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),
    columnsHelper.accessor("contactNumber", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1>Mobile</h1>
            <div className="cursor-pointer"></div>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),

    columnsHelper.accessor("roleId", {
      header: () => {
        return (
          <div>
            <div className="flex justify-between items-center">
              <h1>Role Id</h1>
              <div className="cursor-pointer"></div>
            </div>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),
    columnsHelper.accessor("roleName", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1>Role Name</h1>
            <div className="cursor-pointer"></div>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),
    columnsHelper.accessor("isActive", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1>User Status</h1>
            <div className="cursor-pointer"></div>
          </div>
        );
      },
      cell: (info: any) => {
        return (
          <>
            <p>
              {info.getValue() ? (
                <span className="text-green-600">Active</span>
              ) : (
                "Not Active"
              )}
            </p>
          </>
        );
      },
    }),
  ];

  return (
    <div>
      <div className=" lg:ml-5 lg:mr-6 mx-5">
        <Breadcrum label="User List" />
      </div>
      <div className="mx-6">
        {data?.length === 0 ? (
          <NotFound />
        ) : (
          <CustomTable data={data || []} columns={columns || []} />
        )}
      </div>
    </div>
  );
}

export default UsersList;
