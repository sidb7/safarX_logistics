import React, { useState } from "react";
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


interface IOrdersProps {}

const Rto: React.FunctionComponent<IOrdersProps> = () => {
    const navigate = useNavigate();

  const [totalItemCount] = useState<number>(77);
  const { isLgScreen, isXlScreen } = ResponsiveState();
  const [renderingComponents, setRenderingComponents] = useState(0);
  const[rightModalNdr,setRightModalNdr] =useState(false)
  const [rightModalEdit,setRightModalEdit] = useState(false)
  const [editActionData, setEditActionData] = useState<{ action: string; remark: string } | null>(null);



  const arrayData = [{ label: "Exception NDR" }, { label: "RTO" }];
  
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
  

    // Dummy data for NDR Follow-up
    const ndrFollowUpData = [
        {
          "Consignee's Address incomplete/ Incorrect": "Aug 31, 2024",
          "Comment": "",
          "API": "Sep 01, 2024",
          "Text SMS Eng": "Aug 31, 2024"
        },
        {
          "Consignee's Address incomplete/ Incorrect": "Aug 31, 2024",
          "Comment": "",
          "API": "Sep 01, 2024",
          "Text SMS Eng": "Aug 31, 2024"
        }
      ];

  const dummyData = [
    {
      packageDetails: "Mac Book Air + Air podes",
      dimension: "15x15x15 cm",
      deliveryPartner: "BlueDart",
      rtoDate:"1 June",
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
      clientRemark:"nice work",
      courierRemark:"jaldi karo"
    },
    {
      packageDetails: "Mac Book Air + Air podes",
      dimension: "15x15x15 cm",
      deliveryPartner: "Inkmart",
      rtoDate:"1 April",
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
      clientRemark:"nice work",
      courierRemark:"jaldi karo"
    },
  ];

  const handleEditActionSubmit = (data: { action: string; remark: string }): void => {
    setEditActionData(data);
    // Here you can perform any necessary actions with the submitted data
    console.log("Edit action submitted:", data);
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
              defaultIndexValue={1}
            />
          </div>
          
        </div>

        <div className="flex flex-row-reverse items-center flex-grow">
            <div className="flex mr-4">
              
              <ServiceButton
                text="DOWNLOAD"
                className="bg-[#1C1C1C] text-[#FFFFFF] w-[130px] mr-2"
              />
              
            </div>
          </div>

        <div className="mx-4">
          {/* <OrderData data={dummyData} setRightModalNdr={setRightModalNdr} setRightModalEdit={setRightModalEdit}/> */}
          <RtoData data={dummyData}  setRightModalNdr={setRightModalNdr} setRightModalEdit={setRightModalEdit}/>
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
        {/* <NdrFollowUp 
        followUpData={ndrFollowUpData} 
        onClose={() => setRightModalNdr(false)} 
         /> */}
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

export default Rto;