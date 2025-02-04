import React, { useEffect, useState } from "react";
import WebCloseModalIcon from "../../../assets/PickUp/ModalCrossWeb.svg";
import { useNavigate, useLocation } from "react-router-dom";

import { GoogleMap, LoadScript, MarkerF, Autocomplete } from "@react-google-maps/api";
import CustomButton from "../../../components/Button";
import GPSIcon from "../../../assets/Map/gps.svg";
import LocationIcon from "../../../assets/Map/Location.svg";
import ServiceButton from "../../../components/Button/ServiceButton";

const googleMapApiKey = "AIzaSyAKZhK6VLrzuuikYBNLKYdv9tpUTfW5hRQ";

interface IPropsTypes {
  onClick?: () => void;
  callBackFun?: (data: string) => void;
}

const Index: React.FunctionComponent<IPropsTypes> = ({ onClick, callBackFun }) => {
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
  const [address, setAddress] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onMapClick = async (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setCenterValue({ lat, lng });
      await fetchAddressByLatLng(lat, lng);
    }
  };

  const fetchAddressByLatLng = async (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat, lng } });
    if (response.results && response.results.length > 0) {
      setAddress(response.results[0].formatted_address);
      const shortName = response.results[0].address_components[0]?.short_name || "";
      setShortAddress(shortName);
    }
  };

  const onAutocompleteLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat() || 0;
        const lng = place.geometry.location?.lng() || 0;
        setCenterValue({ lat, lng });
        setAddress(place.formatted_address || "");
        const shortName = place.address_components?.[0]?.short_name || "";
        setShortAddress(shortName);
      }
    }
  };

  const getLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCenterValue({ lat, lng });
        setZoom(15);
        await fetchAddressByLatLng(lat, lng);
      });
    }
  };

  const confirmLocation = () => {
    if (onClick) onClick();
    if (callBackFun) callBackFun(address);
    //navigate("/orders/add-order/pickup", { state: { address } });
  };

  return (
    <>
      {centerValue ? (
        <div className="lg:flex lg:flex-col lg:h-screen lg:pt-5 lg:relative">
          <div className="relative w-full">
            <LoadScript googleMapsApiKey={googleMapApiKey} libraries={["places"]}>
              <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
                <input
                  type="text"
                  placeholder="Search location"
                  className="absolute z-10 top-5 left-5 p-2 border rounded-md shadow-md bg-white"
                  style={{ width: "300px" }}
                />
              </Autocomplete>
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
                text="LOCATE ME" 
                onClick={getLocation} 
                showIcon={true} 
                icon={GPSIcon}
              />
            </div>
            <div className="flex flex-col h-[254px] px-6 py-4 rounded-t-md w-full">
              <div className="flex flex-col mt-8">
                <div className="flex lg:gap-x-2">
                  <img src={LocationIcon} alt="Location" width="24px" />
                  <span className="pl-1 font-medium">
                    {shortAddress}
                  </span>
                </div>
                <div className="flex mt-2">
                  <span className="text-sm font-light">
                    {address}
                  </span>
                </div>
              </div>
              <div className="mt-6 lg:hidden">
                <CustomButton
                  text="CONFIRM LOCATION"
                  onClick={() => confirmLocation()}
                />
              </div>
            </div>
          </div>

          <div
            className="hidden lg:flex justify-end shadow-lg border-[1px] bg-[#FFFFFF] p-6 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
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

export default Index;
