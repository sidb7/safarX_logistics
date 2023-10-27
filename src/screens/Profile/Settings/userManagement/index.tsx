import { useState, useEffect } from "react";
import { CustomTable } from "../../../../components/Table";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import { Navigate, useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/Button";
import { SearchBox } from "../../../../components/SearchBox";
import { createColumnHelper } from "@tanstack/react-table";
import EyeIcon from "../../../../assets/Login/eye.svg";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import DeleteConfirmModale from "./deleteConfirmationModal";
import {
  POST_GET_ALL_USER_DATA,
  POST_DELETE_USER_DATA,
} from "../../../../utils/ApiUrls";
import { useSelector } from "react-redux";
import AccessDenied from "../../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../../redux/reducers/role";

const Buttons = (className?: string, usersData?: any) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="flex">
        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
          text="ADD ROLE"
          onClick={() => navigate("/settings/role-management/add-role")}
        />

        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px] ml-4"
          text="ADD USER"
          onClick={() => navigate("/settings/user-management/add-user")}
        />
      </div>
    </div>
  );
};

function UserManagement() {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);
  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[2]?.isActive;
  const isActive = checkPageAuthorized("User Management");

  const [usersData, setUsersData] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isModalOpen, setIsModalOpen]: any = useState(false);
  const [deleteUser, setDeleteUser]: any = useState("");

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
    columnsHelper.accessor("actions", {
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <div>
              <CustomButton
                text={"UPDATE"}
                onClick={() =>
                  navigate(`/profile/settings/user-management/update-user`, {
                    state: { data: row?.original },
                  })
                }
              />
            </div>
            <div className="border mx-2">
              <CustomButton
                text={"DELETE"}
                onClick={() => deleteRoleModal(row?.original)}
              />
            </div>
          </div>
        );
      },
    }),
  ];

  // get users list from api
  const getUsersData = async () => {
    try {
      const { data }: any = await POST(POST_GET_ALL_USER_DATA, {});

      if (data?.success) {
        setUsersData(data?.data || []);
        setTotalItemCount(data?.data?.[0]?.totalCount || 100);
      } else {
        toast.error(data?.message || "Failed to fetch users");
      }
    } catch (error) {
      setUsersData([]);
    }
  };

  // delete role api call
  const deleteUserApiCall = async (payload: any) => {
    try {
      const reqBody = {
        sellerId: payload?.sellerId || "N/A",
      };

      const { data } = await POST(POST_DELETE_USER_DATA, reqBody);

      if (data?.success) {
        setIsModalOpen(false);
        getUsersData();
      } else {
        toast.error(data?.message || "N/A");
      }
    } catch (error) {
      toast.error("Failed to delete role");
    }
  };

  const deleteRoleModal = async (data: any) => {
    try {
      setDeleteUser(data || {});
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to delete the role");
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum
            label="User Management"
            component={Buttons("", usersData)}
          />
          <div className=" my-3 mx-6">
            <div className=" flex justify-end">
              <div className="grid grid-cols-3 gap-x-2 lg:flex ">
                <div>
                  <SearchBox label="Search" value="" onChange={() => {}} />
                </div>
                <div
                  className="flex justify-between items-center p-2 gap-x-2"
                  // onClick={() => setFilterModal(true)}
                >
                  <span className="text-[#004EFF] text-[14px] font-semibold">
                    FILTER
                  </span>
                </div>
              </div>
            </div>

            <div className=" mt-6">
              <CustomTable data={usersData || []} columns={columns || []} />
            </div>

            <CenterModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="!h-[340px] !w-[480px]"
            >
              <DeleteConfirmModale
                userInfo={deleteUser}
                setIsModalOpen={setIsModalOpen}
                deleteRoleApiCall={deleteUserApiCall}
                title="user"
              />
            </CenterModal>
          </div>
        </div>
      ) : (
        <div>
          <AccessDenied />
        </div>
      )}
    </>
  );
}

export default UserManagement;
