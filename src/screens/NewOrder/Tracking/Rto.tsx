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
import RtoData from "./RtoData";
import {
  DOWNLOAD_NDR_ORDERS,
  GET_NDR_ORDERS,
  POST_ACTION_REMARKS,
} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import SelleractionModal from "./sellerActionModal";
import { tokenKey } from "../../../utils/utility";
import toast from "react-hot-toast";
import { capitalizeFirstLetter } from "../../../utils/utility";




interface IOrdersProps {}

const Rto: React.FunctionComponent<IOrdersProps> = () => {
  const navigate = useNavigate();

  // const [totalItemCount] = useState<number>(77);
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [rightModalNdr, setRightModalNdr] = useState(false);
  const [rightModalEdit, setRightModalEdit] = useState(false);
  const [editActionData, setEditActionData] = useState<{
    action: string;
    remark: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rtoData, setRtoData] = useState<any>([]);
  const [rightModalSellerAction, setRightModalSellerAction] = useState(false);
  const [currentAttemptsReasons, setCurrentAttemptsReasons] = useState<any[]>(
    []
  );
  const [currentSellerRemark, setCurrentSellerRemark] = useState<any[]>([]);
  const [totalItemsCount,setTotalItemsCount] = useState(0)

   // New state for pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);

  // get modal data from tabels
  const handleNdrFollowUpClick = (attemptsReasons: any[]) => {
    setCurrentAttemptsReasons(attemptsReasons);
  };

  const handleSellerActionClick = (sellerRemark: any[]) => {
    setCurrentSellerRemark(sellerRemark);
  };

  const arrayData = [{ label: "Exception NDR" }, { label: "RTO",number:totalItemsCount.toString() }];

  const render = (id: number) => {
    if (id === 0) {
      navigate("/tracking/Exception-ndr");
    } else if (id === 1) {
      navigate("/tracking/Rto");
    }
  };
  const setScrollIndex = (id: number) => {
    setRenderingComponents(id);
    render(id);
  };

  const getRtoOrders = async (page: number, perPage: number) => {
    setIsLoading(true);
    try {
      const requestBody = {
        tabStatus: "RTO",
        page: page,
    perPage: perPage
      };

      const response = await POST(GET_NDR_ORDERS, requestBody);
      setRtoData(response?.data?.data?.[0]?.data || []);
      // setNdrData(undefined);
      // console.log("allCount", tabCount);
      setTotalItemsCount(response?.data?.data?.[0]?.allCount?.[0]?.TotalCount)
      console.log("dataforRTO>>>", response?.data?.data?.[0]?.allCount?.[0]?.TotalCount || []);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRtoOrders(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

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

  const dummyData = [
    {
      packageDetails: "Mac Book Air + Air podes",
      dimension: "15x15x15 cm",
      deliveryPartner: "BlueDart",
      rtoDate: "1 June",
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
      clientRemark: "nice work",
      courierRemark: "jaldi karo",
    },
    {
      packageDetails: "Mac Book Air + Air podes",
      dimension: "15x15x15 cm",
      deliveryPartner: "Inkmart",
      rtoDate: "1 April",
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
      clientRemark: "nice work",
      courierRemark: "jaldi karo",
    },
  ];

  const handlePageChange = ({ currentPage }: { currentPage: number }) => {
    setCurrentPage(currentPage);
  };
  
  const handleItemsPerPageChange = ({ itemsPerPage }: { itemsPerPage: number }) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleEditActionSubmit = (data: {
    action: string;
    remark: string;
  }): void => {
    setEditActionData(data);
    // Here you can perform any necessary actions with the submitted data
    console.log("Edit action submitted:", data);
    setRightModalEdit(false);
  };

  const downloadRtoReport = async () => {
    const payload = {
      tabStatus: "RTO",
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
        `${capitalizeFirstLetter("RTO")}_${date
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
              defaultIndexValue={1}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse items-center flex-grow">
          <div className="flex mr-4">
            <ServiceButton
              text="DOWNLOAD"
              className="bg-[#1C1C1C] text-[#FFFFFF] w-[130px] mr-2"
              onClick={downloadRtoReport}
            />
          </div>
        </div>

        <div className="mx-4">
          {/* <OrderData data={dummyData} setRightModalNdr={setRightModalNdr} setRightModalEdit={setRightModalEdit}/> */}
          <RtoData
            data={rtoData}
            setRightModalNdr={setRightModalNdr}
            setRightModalEdit={setRightModalEdit}
            setRightModalSellerAction={setRightModalSellerAction}
            onNdrFollowUpClick={handleNdrFollowUpClick}
            onSellerActionClick={handleSellerActionClick}


          />
        </div>

        {isLgScreen && totalItemsCount > 0 && (
          <PaginationComponent
          totalItems={totalItemsCount}
          itemsPerPageOptions={[10, 20, 30, 50]}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          pageNo={currentPage}
          initialItemsPerPage={itemsPerPage}
          />
        )}
      </div>

       {/* ndr follow up right modal  */}
       <CustomRightModal
        isOpen={rightModalNdr}
        onClose={() => setRightModalNdr(false)}
        className={""}
      >
        <>
          <NdrFollowUp
            followUpData={currentAttemptsReasons || []}
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
            followUpData={currentSellerRemark || []}
            onClose={() => setRightModalSellerAction(false)}
          />
        </>
      </CustomRightModal>
    </>
  );
};

export default Rto;
