import { useState, useEffect } from "react";
import { CustomTable } from "../../../../components/Table";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/Button";
import { SearchBox } from "../../../../components/SearchBox";
import { createColumnHelper } from "@tanstack/react-table";
import EyeIcon from "../../../../assets/Login/eye.svg";
import { toast } from "react-toastify";
import { POST } from "../../../../utils/webService";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import DeleteConfirmModale from "./deleteConfirmatiomModal";
import {
  POST_GET_ALL_ROLES_DATA,
  POST_DELETE_ROLE_DATA,
} from "../../../../utils/ApiUrls";
import { useSelector } from "react-redux";
import AccessDenied from "../../../../components/AccessDenied";
import { checkPageAuthorized } from "../../../../redux/reducers/role";

const Buttons = (className?: string) => {
  const navigate = useNavigate();

  return (
    <div
      className={
        className
          ? className
          : `lg:flex lg:flex-row-reverse hidden grid-cols-4 gap-x-2 mt-4 lg:mt-0 h-[54px] items-center`
      }
    >
      <div className="flex ">
        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px] disabled:bg-[#E8E8E8] disabled:text-[#BBB]"
          text="ADD USER"
          onClick={() => navigate(`/settings/user-management/add-user`)}
        />

        <CustomButton
          className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px] ml-4"
          text="ADD ROLE"
          onClick={() => navigate("/settings/role-management/add-role")}
          showIcon={false}
        />
      </div>
    </div>
  );
};

// const

function RoleManagement() {
  const navigate = useNavigate();
  const roles = useSelector((state: any) => state?.roles);

  const [rolesData, setRolesData] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const columnsHelper = createColumnHelper<any>();
  const [isModalOpen, setIsModalOpen]: any = useState(false);
  const [deleteRole, setDeleteRole]: any = useState("");

  // const isActive = roles.roles?.[0]?.menu?.[8]?.menu?.[0]?.pages?.[1]?.isActive;
  const isActive = checkPageAuthorized("Role Management");

  const HelperColumn = [
    columnsHelper.accessor("roleId", {
      header: () => {
        return (
          <div className="flex items-center justify-between ">
            <h1 className="font-semibold text-sm text-[#1C1C1C] ">Role Id</h1>
          </div>
        );
      },
      cell: (info: any) => {
        return <p>{info.getValue()}</p>;
      },
    }),
    columnsHelper.accessor("roleName", {
      header: () => {
        return (
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm text-[#1C1C1C]">Role Name</h1>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),
    columnsHelper.accessor("privateCompanyId", {
      header: () => {
        return (
          <div className="flex items-center justify-between">
            <h1 className="font-semibold text-sm text-[#1C1C1C]">Company Id</h1>
          </div>
        );
      },
      cell: (info: any) => info.getValue(),
    }),
    columnsHelper.accessor("users", {
      header: () => {
        return (
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-sm text-[#1C1C1C]">Users</h1>
          </div>
        );
      },
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <div className="max-w-[50px] flex items-center justify-between">
            <div>{data?.users?.length}</div>
            <div
              className="cursor-pointer"
              onClick={() =>
                navigate(`/settings/role-management/userslist`, {
                  state: { data: data.users },
                })
              }
            >
              <img src={EyeIcon} alt="eye" />
            </div>
          </div>
        );
      },
    }),
    columnsHelper.accessor("isActive", {
      header: "Actions",
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <div className="flex justify-center items-center">
            <div>
              <CustomButton
                className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
                text="UPDATE"
                onClick={() =>
                  navigate(
                    `/settings/role-management/update-role?roleId=${data?.roleId}&roleName=${data?.roleName}`
                  )
                }
                // showIcon={true}
              />
            </div>
            <div className="ml-4">
              <CustomButton
                className="lg:px-2 lg:py-4 lg:font-semibold lg:text-[14px]"
                text="DELETE"
                onClick={() => deleteRoleModal(row?.original)}
              />
            </div>
          </div>
        );
      },
    }),
  ];

  // get roles list from api
  const getRolesData = async () => {
    try {
      const { data }: any = await POST(POST_GET_ALL_ROLES_DATA, {});

      if (data?.success) {
        setRolesData(data?.data || []);
        setTotalItemCount(data?.data?.[0]?.totalCount || 100);
      } else {
        toast.error(data?.message || "Failed to fetch roles");
      }
    } catch (error) {
      setRolesData([]);
    }
  };

  // delete role api call
  const deleteRoleApiCall = async (payload: any) => {
    try {
      const reqBody = {
        roleId: payload?.roleId || "N/A",
      };

      const { data } = await POST(POST_DELETE_ROLE_DATA, reqBody);

      if (data?.success) {
        setIsModalOpen(false);
        getRolesData();
      } else {
        toast.error(data?.message || "N/A");
      }
    } catch (error) {
      toast.error("Failed to delete role");
    }
  };

  const deleteRoleModal = async (data: any) => {
    try {
      setDeleteRole(data || {});
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to delete the role");
    }
  };

  useEffect(() => {
    getRolesData();
  }, []);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum label="Role Management" component={Buttons()} />
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
              <CustomTable
                data={rolesData || []}
                columns={HelperColumn || []}
              />
            </div>

            <CenterModal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              className="!h-[280px] !w-[480px]"
            >
              <DeleteConfirmModale
                roleInfo={deleteRole}
                setIsModalOpen={setIsModalOpen}
                deleteRoleApiCall={deleteRoleApiCall}
                title="role"
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

export default RoleManagement;
