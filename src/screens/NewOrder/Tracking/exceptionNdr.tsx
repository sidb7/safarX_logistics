import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import { ScrollNav } from "../../../components/ScrollNav";
import { SearchBox } from "../../../components/SearchBox";
import PaginationComponent from "../../../components/Pagination";
import ServiceButton from "../../../components/Button/ServiceButton";
import { ResponsiveState } from "../../../utils/responsiveState";
import OrderData from "./OrderData";
import { useNavigate } from "react-router-dom";
import CustomRightModal from "../../../components/CustomModal/customRightModal";
import NdrFollowUp from "./NdrFollowUp";
import EditAction from "./EditAction";
import {
  DOWNLOAD_NDR_ORDERS,
  GET_NDR_ORDERS,
  POST_ACTION_REMARKS,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import SelleractionModal from "./sellerActionModal";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../utils/utility";
import whiteDownloadIcon from "../../../assets/whiteDownloadIcon.svg";
import DownloadIconWhite from "../../../assets/downloadIconWhite.svg";
import { convertXMLToXLSX } from "../../../utils/helper";
import { SELLER_URL } from "../../../utils/ApiUrls";
import { tokenKey } from "../../../utils/utility";
import CenterModal from "../../../components/CustomModal/customCenterModal";
import CustomUploadButton from "../Product/CustomUploadButton";
import CustomBulkOrderUploadButton from "../../../components/CustomBulkOrderUpload";
import NdrRemarksContent from "./NdrRemarksContent";

interface IOrdersProps {}

const ExceptionNdr: React.FunctionComponent<IOrdersProps> = () => {
  const navigate = useNavigate();

  const [totalItemCount] = useState<number>(77);
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [rightModalNdr, setRightModalNdr] = useState(false);
  const [rightModalEdit, setRightModalEdit] = useState(false);
  const [editActionData, setEditActionData] = useState<{
    action: string;
    remark: string;
  } | null>(null);
  const [ndrData, setNdrData] = useState<any>([]);
  const [rightModalSellerAction, setRightModalSellerAction] = useState(false);
  const [selectedPackages, setSelectedPackages] = useState<
    Record<string, boolean>
  >({});
  const [selectedRowIds, setSelectedRowIds] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentAttemptsReasons, setCurrentAttemptsReasons] = useState<any[]>(
    []
  );
  const [currentSellerRemark, setCurrentSellerRemark] = useState<any[]>([]);
  const [actionModalRemark, setActionModalRemark] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  // get modal data from tabels
  const handleNdrFollowUpClick = (attemptsReasons: any[]) => {
    setCurrentAttemptsReasons(attemptsReasons);
  };

  const handleSellerActionClick = (sellerRemark: any[]) => {
    setCurrentSellerRemark(sellerRemark);
  };

  const handleActionModalClick = (actionModalRemark: any[]) => {
    setActionModalRemark(actionModalRemark);
  };

  useEffect(() => {
    // Initialize selectedPackages based on dummyData
    const initialSelectedPackages: Record<string, boolean> = {};
    dummyData.forEach((item) => {
      initialSelectedPackages[item.packageDetails] = false;
    });
    setSelectedPackages(initialSelectedPackages);
  }, []);

  const handleSelectAllPackages = (checked: boolean) => {
    setSelectedPackages((prevSelected) => {
      const newSelected = { ...prevSelected };
      dummyData.forEach((item) => {
        newSelected[item.packageDetails] = checked;
      });
      return newSelected;
    });
  };

  const handleSelectPackage = (packageDetails: string, checked: boolean) => {
    setSelectedPackages((prevSelected) => ({
      ...prevSelected,
      [packageDetails]: checked,
    }));
  };

  const arrayData = [{ label: "Exception NDR" }, { label: "RTO" }];

  const render = (id: any) => {
    if (id === 0) {
      navigate("tracking/Exception-ndr");
    } else if (id === 1) {
      navigate("/tracking/Rto");
    }
  };

  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  // Dummy data for NDR Follow-up
  const ndrFollowUpData = [
    {
      "Consignee's Address incomplete/ Incorrect": "Aug 31, 2024",
      Comment: "",
      API: "Sep 01, 2024",
      "Text SMS Eng": "Aug 31, 2024",
    },
    {
      "Consignee's Address incomplete/ Incorrect": "Aug 31, 2024",
      Comment: "",
      API: "Sep 01, 2024",
      "Text SMS Eng": "Aug 31, 2024",
    },
  ];

  //dummy data for seller action
  const sellerActionData = [
    {
      "Latest Shipyaari Action Date": "N/A",
      "Latest Shipyaari Remarks": "-",
      "Seller Action Date": "Sep 01, 2024",
      "Seller Action Remark": "Reattempt",
    },
    {
      "Latest Shipyaari Action Date": "N/A",
      "Latest Shipyaari Remarks": "-",
      "Seller Action Date": "Sep 01, 2024",
      "Seller Action Remark": "Reattempt",
    },
  ];

  const dummyData = [
    {
      packageDetails: "Mac Book Air + Air podes",
      dimension: "15x15x15 cm",
      sku: "GT87YU1",
      order: "GYSH23678119",
      tracking: "GYSH23678119 (3)",
      shipyaari: "GYSH23678119",
      payment: "₹5,000 ONLINE",
      customerDetails: {
        name: "Jhindal Warehouse",
        address: "Plot no.18, Sector 7, Link road, Andheri",
        contact: "Satish Sharma +91 12345 12345",
      },
      pickupDate: "P: 01 Sep 2024",
      ndrDate: "N: 03 Sep 2024",
      currentStatus: "Exception",
    },
    {
      packageDetails: "Mac Book Air + Air podes",
      dimension: "15x15x15 cm",
      sku: "GT87YU1",
      order: "GYSH23678119",
      shipyaari: "GYSH23678119",
      payment: "₹5,000 COD",
      customerDetails: {
        name: "Jhindal Warehouse",
        address: "Plot no.18, Sector 7, Link road, Andheri",
        contact: "Satish Sharma +91 12345 12345",
      },
      pickupDate: "P: 01 Sep 2024",
      ndrDate: "N: 03 Sep 2024",
      currentStatus: "Exception",
      followUp: ["NDR Follow-up", "Seller Action"],
    },
  ];

  const getNdrOrders = async () => {
    try {
      const requestBody = {
        tabStatus: "EXCEPTION",
        subStatus: "ALL",
      };

      const response = await POST(GET_NDR_ORDERS, requestBody);
      setNdrData(response?.data?.data?.[0]?.data || []);
      // setNdrData(undefined);

      console.log("dataforme>>>", response?.data?.data?.[0]?.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNdrOrders();
  }, []);

  const handleEditActionSubmit = (data: {
    action: string;
    remark: string;
  }): void => {
    setEditActionData(data);
    // Here you can perform any necessary actions with the submitted data

    console.log("Edit action submitted:", data);
    console.log("awb", actionModalRemark);
    setRightModalEdit(false);
  };

  // download data in xl sheet func
  // const downloadXlData = async () => {
  //   setIsLoading(true);
  //   const { data: response } = await POST(DOWNLOAD_NDR_ORDERS, {
  //     tabStatus: "EXCEPTION",
  //   });
  //   if (response?.success) {
  //     const date: any = JSON.stringify(new Date());
  //     const result = await convertXMLToXLSX(
  //       response?.data,
  //       `${capitalizeFirstLetter("weight dispute")}_${date
  //         .substr(1, 10)
  //         .split("-")
  //         .reverse()
  //         .join("-")}.xlsx`
  //     );
  //     if (result) {
  //       toast.success(response?.message);
  //       setIsLoading(false);
  //     }
  //   } else {
  //     setIsLoading(false);
  //     toast.error(response?.message);
  //   }
  // };

  const downloadNdrReport = async () => {
    const payload = {
      tabStatus: "EXCEPTION",
    };
    try {
      setIsLoading(true); // Start the loader
      let sellerId = localStorage.getItem("sellerId");

      const response = await fetch(DOWNLOAD_NDR_ORDERS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            `${sellerId}_${tokenKey}`
          )}`,
        },
        body: JSON.stringify(payload),
      });

      // Stop the loader regardless of the response status
      setIsLoading(false);

      if (!response.ok) {
        const contentType = response.headers.get("Content-Type");

        // Check if the Content-Type indicates JSON
        if (contentType && contentType.includes("application/json")) {
          const jsonData = await response.json();
          console.log("JSON Data:", jsonData);

          if (!jsonData?.success) {
            toast.error(jsonData?.message);
          }
        } else {
          // Handle other types of responses or errors
          toast.error("An unexpected error occurred.");
        }

        return; // Exit the function to avoid further processing
      }
      const blob = await response.blob();
      const date: any = JSON.stringify(new Date());
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${capitalizeFirstLetter("EXCEPTION")}_${date
          .substr(1, 10)
          .split("-")
          .reverse()
          .join("-")}.xlsx`
      ); // Specify the filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Downloaded Sucessfully");

      setIsLoading(false);
      return;
      // Handle successful response here
      // Example: process the downloaded file, etc.
    } catch (error: any) {
      // Handle network errors or exceptions
      console.error("Fetch error:", error);

      toast.error(error.message);
      setIsLoading(false); // Stop the loader if an error occurs
      return;
    }
  };

  return (
    <>
      <div>
        <Breadcrum label="Exception NDR" />
        <div className="flex flex-wrap items-center justify-between mx-4 lg:mt-2 lg:mb-4">
          <div className="flex-shrink-0 mr-4 mb-2 lg:mb-0">
            <ScrollNav
              arrayData={arrayData}
              showNumber={true}
              setScrollIndex={setScrollIndex}
              defaultIndexValue={0}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse items-center flex-grow">
          <div className="flex mr-4">
            <div className=" px-2">
              <SearchBox label="Search" value="" onChange={() => {}} />
            </div>
            <ServiceButton
              icon={whiteDownloadIcon}
              showIcon={true}
              text="NDR REPORT"
              className="bg-[#1C1C1C] text-[#FFFFFF] w-[130px] mr-2"
              onClick={downloadNdrReport}
            />
            <ServiceButton
              showIcon={true}
              icon={DownloadIconWhite}
              text="NDR REMARKS"
              onClick={() => setOpenUploadModal(true)}
              className="bg-[#1C1C1C] text-[#FFFFFF] w-[130px]"
            />
          </div>
        </div>

        <div className="mx-4">
          <OrderData
            data={ndrData}
            setRightModalNdr={setRightModalNdr}
            setRightModalEdit={setRightModalEdit}
            setRightModalSellerAction={setRightModalSellerAction}
            selectedPackages={selectedPackages}
            onSelectAllPackages={handleSelectAllPackages}
            onSelectPackage={handleSelectPackage}
            selectedRowIds={selectedRowIds}
            setSelectedRowIds={setSelectedRowIds}
            onNdrFollowUpClick={handleNdrFollowUpClick}
            onSellerActionClick={handleSellerActionClick}
            onActionModalClick={handleActionModalClick}
          />
        </div>

        {isLgScreen && totalItemCount > 0 && (
          <PaginationComponent
            totalItems={totalItemCount}
            itemsPerPageOptions={[10, 20, 30, 50]}
            onPageChange={() => {}}
            onItemsPerPageChange={() => {}}
          />
        )}
      </div>

      <CenterModal
        isOpen={openUploadModal}
        onRequestClose={() => setOpenUploadModal(false)}
        className="lg:!h:1/3 lg:!w-2/3 xl:!h-1/2 xl:!w-1/3"
      >
        <NdrRemarksContent
          openUploadModal={openUploadModal}
          setOpenUploadModal={setOpenUploadModal}
        />
      </CenterModal>

      {/* ndr follow up right modal  */}
      <CustomRightModal
        isOpen={rightModalNdr}
        onClose={() => setRightModalNdr(false)}
        className={""}
      >
        <>
          <NdrFollowUp
            followUpData={currentAttemptsReasons}
            onClose={() => setRightModalNdr(false)}
          />
        </>
      </CustomRightModal>

      {/* seller action right modal  */}
      <CustomRightModal
        isOpen={rightModalSellerAction}
        onClose={() => setRightModalSellerAction(false)}
        className={""}
      >
        <>
          <SelleractionModal
            followUpData={currentSellerRemark}
            onClose={() => setRightModalSellerAction(false)}
          />
        </>
      </CustomRightModal>

      {/* edit right modal  */}
      <CustomRightModal
        isOpen={rightModalEdit}
        onClose={() => setRightModalEdit(false)}
        className={""}
      >
        <EditAction
          onClose={() => setRightModalEdit(false)}
          onSubmit={handleEditActionSubmit}
        />
      </CustomRightModal>
    </>
  );
};

export default ExceptionNdr;
