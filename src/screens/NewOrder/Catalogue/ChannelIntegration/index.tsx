import React, { useState } from "react";
import NavBar from "../../../../layout/Old_NavBar";
import BackArrow from "../../../../assets/Catalogue/backBTN.svg";
import CardsWithScroll from "./CardsWithScroll";
import { dummyChannelIntegrationData } from "../../../../utils/dummyData";
import ServiceButton from "../../../../components/Button/ServiceButton";
import AddressBook from "../AddressBook/AddressBook";
import CustomButton from "../../../../components/Button";
import AddImage from "../../../../assets/Catalogue/add.svg";
import ProductCatalogue from "../ProductCatalogue/productCatalogue";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { channelName, productBtnName } from "../../../../redux/reducers/catalogue";
import BoxCatalogueNew from "../BoxCatalogueNew/boxCatalogueNew";

interface IPropsTypes {}

const Index = (props: IPropsTypes) => {
  console.log('hiiiii');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const catalogueState = useSelector((state:any)=>state?.catalogue);
  console.log('catalogueState :',catalogueState);
  
  
  const [statusId, setStatusId] = useState(0);
  const [statusData, setStatusData] = useState([
    {
      statusName: "Channel Integration",
    },
    {
      statusName: "Address Book",
    },
    {
      statusName: "Product Catalogue",
    },
    {
      statusName: "Box Catalogue",
    },
  ]);

  // console.log("statusId :", statusId);
  
  return (
    <div className="relative">
      <NavBar />
      <div className="hidden ml-[60px] mt-5 lg:block">
        <p className="font-normal text-[14px] text-[#777777] ">
          Home /
          <span className="font-semibold text-[14px] text-[#1C1C1C]">
            Catalogue
          </span>
        </p>
      </div>
      <div className="hidden lg:flex lg:justify-between flex-row gap-x-1 mb-5 items-center ml-5">
        <div className="flex">
        <img src={BackArrow} alt="" className="cursor-pointer" onClick={()=>navigate(-1)} />
        <p className="font-bold text-[28px] text-[#1C1C1C]">
        { catalogueState.channelName==='Box Catalogue' ?  'Box Catalogue' : 'Catalogue' }  
        </p>
        </div>

        {
          catalogueState?.channelName === "Address Book" && <div className="mr-5">
          <CustomButton
            icon={AddImage}
            showIcon={true}
            text={"ADD ADDRESS"}
            className="!p-3"
            onClick={function (): void {
              alert('Add Address Function')
            }}
          />
        </div>
        } 
        {
          catalogueState?.channelName === "Product Catalogue" && catalogueState?.productBtnName === "Single Product" && <div className="mr-5">
          <CustomButton
            icon={AddImage}
            showIcon={true}
            text={"ADD PRODUCT"}
            className="!p-3"
            onClick={function (): void {
              navigate('/neworder/channel-integration/addproduct')
            }}
          />
        </div>
        }
        {
          catalogueState?.channelName === "Product Catalogue" && catalogueState?.productBtnName === "Combo Product" && <div className="mr-5">
          <CustomButton
            icon={AddImage}
            showIcon={true}
            text={"ADD COMBO"}
            className="!p-3"
            onClick={function (): void {
              navigate('/neworder/channel-integration/addcombo')
            }}
          />
        </div>
        } 
      </div>
      { catalogueState.channelName === 'Box Catalogue' ? 
      '' 
      :
       <div className="flex gap-x-2 ml-5 overflow-x-scroll whitespace-nowrap mt-2 h-[34px] lg:mt-9">
        {statusData.map(({ statusName }, index) => {
          return (
            <div
              className={`flex justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4 ${
                catalogueState?.channelName === statusName ? "!border-[#004EFF]" : ""
              }`}
              onClick={() => dispatch(channelName(statusName)) }
              key={index}
            >
              <span
                className={`text-[#777777] text-[14px] lg:text-[18px] ${
                  catalogueState?.channelName === statusName ? "!text-[#004EFF] lg:text-[18px]" : ""
                }`}
              >
                {statusName}
              </span>
            </div>
          );
        })}
      </div> }
      
      {catalogueState?.channelName === "Channel Integration" && (
        <div className="flex flex-col px-5 ">
          <div
            className="overflow-scroll	"
            style={{
              height: "calc(100vh - 200px)",
            }}
          >
            {dummyChannelIntegrationData.map((eachChannelType, index) => {
              return (
                <CardsWithScroll
                  eachChannelType={eachChannelType}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
      
      

      { catalogueState?.channelName === "Address Book" && (  <AddressBook /> ) }
      { catalogueState?.channelName === "Product Catalogue" && <ProductCatalogue /> }
      { catalogueState?.channelName === "Box Catalogue" && <BoxCatalogueNew /> }

     

      <div className="grid grid-cols-2 lg:!flex lg:!justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] gap-[32px] p-[24px] rounded-tr-[24px] rounded-tl-[24px] w-full  fixed bottom-0">
        <ServiceButton
          text="BACK"
          className="bg-[#FFFFFF] text-[#1C1C1C] lg:px-[37px]"
          onClick={()=>navigate(-1)}
        />
        <ServiceButton
          text="SAVE"
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:px-[37px]"
        />
      </div>
    </div>
  );
};

export default Index;
