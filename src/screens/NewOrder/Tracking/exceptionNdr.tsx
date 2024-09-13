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
import { GET_NDR_ORDERS , POST_ACTION_REMARKS} from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import SelleractionModal from "./sellerActionModal";

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
  const [selectedPackages, setSelectedPackages] = useState<Record<string, boolean>>({});
  const [selectedRowIds, setSelectedRowIds] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentAttemptsReasons, setCurrentAttemptsReasons] = useState<any[]>([]);
  const [currentSellerRemark, setCurrentSellerRemark] = useState<any[]>([]);
  const [actionModalRemark, setActionModalRemark] = useState<any[]>([]);



  
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
    dummyData.forEach(item => {
      initialSelectedPackages[item.packageDetails] = false;
    });
    setSelectedPackages(initialSelectedPackages);
  }, []);

  const handleSelectAllPackages = (checked: boolean) => {
    setSelectedPackages(prevSelected => {
      const newSelected = { ...prevSelected };
      dummyData.forEach(item => {
        newSelected[item.packageDetails] = checked;
      });
      return newSelected;
    });
  };

  const handleSelectPackage = (packageDetails: string, checked: boolean) => {
    setSelectedPackages(prevSelected => ({
      ...prevSelected,
      [packageDetails]: checked
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
    console.log("awb",actionModalRemark)
    setRightModalEdit(false);
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
              text="NDR REPORT"
              className="bg-[#1C1C1C] text-[#FFFFFF] w-[130px] mr-2"
            />
            <ServiceButton
              text="NDR REMARKS"
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

