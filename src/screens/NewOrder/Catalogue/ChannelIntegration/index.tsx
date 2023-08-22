import React, { useState } from "react";
import NavBar from "../../../../layout/NavBar";
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
import {
  channelName,
  productBtnName,
} from "../../../../redux/reducers/catalogue";
import BoxCatalogueNew from "../BoxCatalogueNew/boxCatalogueNew";
import BottomLayout from "../../../../components/Layout/bottomLayout";

interface IPropsTypes {}

const Index = (props: IPropsTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const catalogueState = useSelector((state: any) => state?.catalogue);
  console.log("catalogueState :", catalogueState);

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

  return (
    <div className="relative">
      <div className=" ml-[60px] mt-20 lg:block">
        <p className="font-normal text-[14px] text-[#777777] ">
          Home /
          <span className="font-semibold text-[14px] text-[#1C1C1C]">
            Catalogue
          </span>
        </p>
      </div>
      <div className="flex justify-between lg:flex lg:justify-between lg:flex-row gap-x-14 mb-5 items-center mx-3 lg:w-screen">
        <div className="flex">
          <img
            src={BackArrow}
            alt=""
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <p className="font-bold text-[28px] text-[#1C1C1C]">
            {catalogueState.channelName === "Box Catalogue"
              ? "Box Catalogue"
              : "Catalogue"}
          </p>
        </div>

        {catalogueState?.channelName === "Address Book" && (
          <div className="mr-5">
            <CustomButton
              icon={AddImage}
              showIcon={true}
              text={"ADD ADDRESS"}
              className="!p-3"
              onClick={function (): void {
                alert("Add Address Function");
              }}
            />
          </div>
        )}
        {catalogueState?.channelName === "Product Catalogue" &&
          catalogueState?.productBtnName === "Single Product" && (
            <div className="mr-5">
              <CustomButton
                icon={AddImage}
                showIcon={true}
                text={"ADD PRODUCT"}
                className="!p-3 "
                onClick={function (): void {
                  navigate("/neworder/channel-integration/addproduct");
                }}
              />
            </div>
          )}
        {catalogueState?.channelName === "Product Catalogue" &&
          catalogueState?.productBtnName === "Combo Product" && (
            <div className="mr-5">
              <CustomButton
                icon={AddImage}
                showIcon={true}
                text={"ADD COMBO"}
                className="!p-3"
                onClick={function (): void {
                  navigate("/neworder/channel-integration/addcombo");
                }}
              />
            </div>
          )}
      </div>
      {catalogueState.channelName === "Box Catalogue" ? (
        ""
      ) : (
        <div className="flex flex-col lg:flex lg:flex-row gap-x-2 ml-5 overflow-x-scroll whitespace-nowrap mt-2 lg:h-[34px] lg:mt-9">
          {statusData.map(({ statusName }, index) => {
            return (
              <div
                className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4 ${
                  catalogueState?.channelName === statusName
                    ? "!border-[#004EFF]"
                    : ""
                }`}
                onClick={() => dispatch(channelName(statusName))}
                key={index}
              >
                <span
                  className={`text-[#777777] text-[14px] lg:text-[18px] ${
                    catalogueState?.channelName === statusName
                      ? "!text-[#004EFF] lg:text-[18px]"
                      : ""
                  }`}
                >
                  {statusName}
                </span>
              </div>
            );
          })}
        </div>
      )}

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

      {catalogueState?.channelName === "Address Book" && <AddressBook />}
      {catalogueState?.channelName === "Product Catalogue" && (
        <ProductCatalogue />
      )}
      {catalogueState?.channelName === "Box Catalogue" && <BoxCatalogueNew />}

      <div className="mt-20">
        <BottomLayout backButtonText="BACK" nextButtonText="SAVE" />
      </div>
    </div>
  );
};

export default Index;
