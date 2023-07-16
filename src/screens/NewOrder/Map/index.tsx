import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import CustomButton from "../../../components/Button";
import GPSIcon from "../../../assets/Map/gps.svg";
import LocationIcon from "../../../assets/Map/Location.svg";
import { useAppDispatch } from "../../../hooks/typeHook";
import { mapAddress } from "../../../redux/reducers/mapReducer";
import { useNavigate } from "react-router-dom";
const googleMapApiKey = "AIzaSyBEi1iP1YW3fGeKg---Rn7QCelztyYYfVk";

const Index: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

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
    "Mahakali Caves Rd, Shanti Nagar, Andheri East, Mumbai, Maharashtra 400093"
  );

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
        data: {placeId: placeId }
      };
      const { data } = await axios(config);
      if (data.status === true) {
        setAddress(data?.result?.formatted_address);
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
    dispatch(mapAddress({ address: address }));
    navigate("/neworder/pickup")
  };

  return (
    <>
      {centerValue ? (
        <div className="relative w-full">
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
              {/* <StandaloneSearchBox
                onLoad={onLoad}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  placeholder="Customized your placeholder"
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px",
                  }}
                />
              </StandaloneSearchBox> */}
              {/* <InfoWindow
                onLoad={onLoad}
                position={centerValue}
              >
              </InfoWindow> */}
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
              <span className="text-base font-light	">
                Select pickup location
              </span>
              <button className="text-blue-600 underline underline-offset-4">
                CHANGE
              </button>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex">
                <img src={LocationIcon} alt="Location" width="24px" />
                <span className="pl-1 font-medium">Andheri East</span>
              </div>
              <div className="flex mt-2">
                <span className="text-sm font-light	">
                  Mahakali Caves Rd, Shanti Nagar, Andheri East, Mumbai,
                  Maharashtra 400093
                  {address}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <CustomButton
                text="CONFIRM LOCATION"
                onClick={() => confirmLocation()}
              />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Index;
