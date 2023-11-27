import React, { useState, useEffect, SetStateAction } from "react";
import AddressCard from "./addressCard";
import CustomDropDown from "../../../../components/DropDown";
import { POST } from "../../../../utils/webService";
import {
  GET_PICKUP_ADDRESS,
  GET_DELIVERY_ADDRESS,
  DELETE_PICKUP_ADDRESS,
  DELETE_DELIVERY_ADDRESS,
} from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import { Spinner } from "../../../../components/Spinner";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import WebCrossIcon from "../../../../assets/PickUp/ModalCrossWeb.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import DeleteGifIcon from "../../../../assets/deleteGif.svg";

interface IAddressBookProps {
  setAddressTab: React.Dispatch<SetStateAction<string>>;
}

const AddressBook: React.FunctionComponent<IAddressBookProps> = ({
  setAddressTab,
}) => {
  const [filterId, setFilterId] = useState(0);
  const [address, setAddress]: any = useState();
  const [activeTab, setActiveTab] = useState("pickup");
  const [loading, setLoading] = useState(false);
  const [addressToBeDeleted, setAddressToBeDeleted] = useState<any>("");

  const [filterData, setFilterData] = useState([
    { label: "Pickup Address", isActive: false },
    { label: "Delivery Address", isActive: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  const cardData = (address: any) => {
    return {
      addressLabel: address?.addressType,
      address: [
        address?.flatNo,
        address?.address,
        address?.sector,
        address?.landmark,
        address?.pincode,
        address?.city,
        address?.state,
        address?.country,
      ].join(","),
      name: address?.contact?.name,
      phoneNumber:
        address?.contact?.mobileNo || address?.contact?.alternateMobileNo || "",
    };
  };

  const getAddress = async () => {
    setLoading(true);
    const { data: allAddressData }: any = await POST(
      filterId === 0 ? GET_PICKUP_ADDRESS : GET_DELIVERY_ADDRESS
    );
    if (allAddressData?.success) {
      setAddress(allAddressData.data);
      setLoading(false);
    } else {
      toast.error(allAddressData?.message);
      setAddress([]);
      setLoading(false);
    }
  };

  console.log("Hiiiii");
  useEffect(() => {
    (async () => {
      await getAddress();
    })();
  }, [filterId]);

  const filterComponent = (className?: string) => {
    return (
      <div className="flex  mt-6">
        <div
          className={`flex text-[14px] text-[#777777] font-medium h-[44px] cursor-pointer`}
        >
          {filterData?.map((singleData, index) => {
            return (
              <span
                key={index}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                  filterId === index
                    ? `${
                        index === filterData.length - 1
                          ? "rounded-r-md"
                          : "rounded-l-md"
                      } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => {
                  setFilterId(index);
                  if (index === 0) {
                    setAddressTab("pickup");
                    setActiveTab("pickup");
                  } else if (index === 1) {
                    setAddressTab("delivery");
                    setActiveTab("delivery");
                  }
                }}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
        {/* <div className="ml-2 w-[265px]">
          <CustomDropDown
            value=""
            onChange={() => {}}
            options={[
              {
                label: "Domestic",
                value: "Domestic",
              },
              {
                label: "International",
                value: "International",
              },
            ]}
            selectClassName="rounded-md bg-[#FEFEFE] !h-[45px]"
          />
        </div> */}
      </div>
    );
  };

  const deleteAddress = async () => {
    try {
      //Delete PickUpAddress, DeliveryAddress API
      let payload, deleteUrl;

      if (activeTab === "pickup") {
        deleteUrl = DELETE_PICKUP_ADDRESS;
        payload = { pickupAddressId: addressToBeDeleted };
      } else {
        deleteUrl = DELETE_DELIVERY_ADDRESS;
        payload = { deliveryAddressId: addressToBeDeleted };
      }

      const { data: response }: any = await POST(deleteUrl, payload);

      if (response?.success) {
        await getAddress();
      }
    } catch (error) {
      console.error(" ERROR", error);
      return error;
    }
  };

  const deleteModalContent = () => {
    return (
      <div className="flex flex-col  h-full w-full   p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="flex flex-col justify-center  items-center h-full w-full  ">
          <img src={DeleteGifIcon} alt="" />
          <p className="font-Open text-sm md:text-base font-semibold text-center">
            Are you sure you want to delete this address?
          </p>
          <div className="flex  items-center gap-x-4 mt-10">
            <ServiceButton
              text="Yes"
              className="bg-[#ffffff] px-4 py-2 text-[#1c1c1c] font-semibold text-sm"
              onClick={() => {
                // createPlan(onSelectPlan);
                deleteAddress();
                setIsModalOpen(false);
              }}
            />
            <ServiceButton
              text="No"
              className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <div>
          {filterComponent()}
          {/* Display Address */}
          {/* <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-x-0 mt-4"> */}
          <div className="flex gap-3 mt-4  flex-wrap">
            {address?.map((data: any, index: any) => {
              return (
                <AddressCard
                  cardData={cardData(data)}
                  key={index}
                  addressData={data}
                  activeTab={activeTab}
                  setIsModalOpen={() => setIsModalOpen(true)}
                  setAddressToBeDeleted={() =>
                    setAddressToBeDeleted(
                      activeTab === "pickup"
                        ? data.pickupAddressId
                        : data.deliveryAddressId
                    )
                  }
                />
              );
            })}
          </div>
          <CenterModal
            isOpen={isModalOpen}
            className="!w-[30%] !h-[40%] "
            onRequestClose={() => setIsModalOpen(false)}
          >
            {deleteModalContent()}
          </CenterModal>
        </div>
      )}
    </>
  );
};

export default AddressBook;
