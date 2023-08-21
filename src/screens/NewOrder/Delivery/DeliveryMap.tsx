import React, { useEffect, useState } from "react";
import WebCloseModalIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation

import axios from "axios";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import CustomButton from "../../../components/Button";
import GPSIcon from "../../../assets/Map/gps.svg";
import LocationIcon from "../../../assets/Map/Location.svg";
import ServiceButton from "../../../components/Button/ServiceButton";

const googleMapApiKey = "AIzaSyBEi1iP1YW3fGeKg---Rn7QCelztyYYfVk";

interface IPropsTypes {
  onClick?: () => void;
}

const DeliveryMap: React.FunctionComponent<IPropsTypes> = (
  props: IPropsTypes
) => {
  const { onClick } = props;

  const navigate = useNavigate();

  const containerStyle = {
    width: "100%",
    height: "546px",
  };
  const [centerValue, setCenterValue] = useState({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [zoom, setZoom] = useState(5);
  const [address, setAddress] = useState(
    "Shipyaari HQ, 12A, 3rd Floor, Techniplex - II, off Veer Savarkar Flyover, Malad, Liliya Nagar, Goregaon West, Mumbai, Maharashtra 400062, India."
  );
  const [shortAddress, setshortAddress] = useState("Goregaon West");
  console.log("addressoonMapScreen", address);
  const onMapClick = async (e: any) => {
    setCenterValue({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    if (e.placeId) {
      await getAddress(e.placeId);
    }
  };

  async function getAddress(placeId: string) {
    try {
      const config = {
        method: "post",
        url: `http://65.2.176.43:8006/api/v1/address/getAddress`,
        headers: { authorization: "6481876edafb412cf0294413" },
        data: { placeId: placeId },
      };

      const response = await axios(config);

      if (response.data.success === 1 && response.data.data.result) {
        const formattedAddress = response.data.data.result.formatted_address;
        console.log("Formatted Address:", formattedAddress);
        setAddress(formattedAddress);
        const addressComponents = response.data.data.result.address_components;
        const shortAddress = addressComponents[3].short_name;
        setshortAddress(shortAddress);
        console.log("addressComponents", addressComponents[3].short_name);
      } else {
        console.log("Failed to get address");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  async function getLocation() {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition(function (position) {
        setCenterValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setZoom(15);
      });
    } else {
      console.log("Not Available");
    }
  }

  useEffect(() => {
    (async () => await getLocation())();
  }, []);

  const confirmLocation = () => {
    if (onClick) {
      onClick();
    }
    navigate("/neworder/delivery", { state: { address: address } });
  };

  return (
    <>
      {centerValue ? (
        <div className="lg:flex lg:flex-col lg:h-screen  lg:pt-5 lg:relative">
          <div className="hidden   lg:flex justify-between items-center mb-5 lg:px-5 ">
            <p className="font-normal text-[24px] text-[#323232]">
              Search Location
            </p>
            <img
              src={WebCloseModalIcon}
              alt="Close Icon"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>

          <div className="relative w-full ">
            <LoadScript
              googleMapsApiKey={googleMapApiKey}
              libraries={["places"]}
              region="india"
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={centerValue}
                zoom={zoom}
                onClick={onMapClick}
              >
                <MarkerF position={centerValue} />
              </GoogleMap>
            </LoadScript>
            <div className="absolute top-[60%] left-[25%] w-1/2 flex justify-center">
              <CustomButton
                className=""
                text="LOCATE ME"
                onClick={() => getLocation()}
                showIcon={true}
                icon={GPSIcon}
              ></CustomButton>
            </div>

            <div className="flex flex-col h-[254px] px-6 py-4 rounded-t-md w-full">
              <div className="flex items-center justify-between mt-4">
                <span className="text-base font-light lg:font-normal lg:text-[16px]	">
                  Select pickup location
                </span>
                <button className="text-blue-600 underline underline-offset-4 lg:font-semibold lg:text-[16px]">
                  CHANGE
                </button>
              </div>
              <div className="flex flex-col mt-8">
                <div className="flex lg:gap-x-2">
                  <img src={LocationIcon} alt="Location" width="24px" />
                  <span className="pl-1 font-medium lg:font-semibold lg:text-base">
                    {shortAddress}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="text-sm font-light lg:font-normal	">
                    {address}
                  </span>
                </div>
              </div>
              <div className="mt-6 lg:hidden    ">
                <CustomButton
                  text="CONFIRM LOCATION"
                  onClick={() => confirmLocation()}
                />
              </div>
            </div>
          </div>

          <div
            className="hidden lg:flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] p-6  rounded-tr-[32px] rounded-tl-[32px]   fixed bottom-0 "
            style={{ width: "-webkit-fill-available" }}
          >
            <ServiceButton
              text="CONFIRM LOCATION"
              onClick={() => confirmLocation()}
              className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeliveryMap;
