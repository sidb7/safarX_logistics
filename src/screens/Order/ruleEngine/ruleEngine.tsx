import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../../components/Layout/breadcrum";
import toast from "react-hot-toast";
import OneButton from "../../../components/Button/OneButton";
import { GET, POST } from "../../../utils/webService";
import {
  GET_ALLPARTNER_OFSELLER,
  UPDATE_ALLPARTNER_OF_SELLER,
} from "../../../utils/ApiUrls";
import BottomLayout from "../../../components/Layout/bottomLayout";

interface Partner {
  id: string;
  name: string;
}

const RuleEngine: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [selectedPartners, setSelectedPartners] = useState<Partner[]>([]);
  const [activeTab, setActiveTab] = useState("partnerPriority");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await GET(GET_ALLPARTNER_OFSELLER);
        console.log("response", response);
        if (response?.data?.success) {
          //   console.log("inside the if ", response.data);

          const fetchedPartners = response.data.data.map(
            (partner: string, index: number) => ({
              id: `partner-${index}`,
              name: partner,
            })
          );
          setPartners(fetchedPartners);
        } else {
          toast.error("Failed to fetch partners");
        }
      } catch (error) {
        toast.error("An error occurred while fetching partners");
      }
    };

    fetchPartners();
  }, []);

  const handleUpdateClientList = async () => {
    try {
      const partnerNames = selectedPartners.map((partner) => partner.name);
      const response = await POST(UPDATE_ALLPARTNER_OF_SELLER, {
        partners: partnerNames,
      });

      if (response?.data?.succes) {
        toast.success("Partners updated successfully");
      } else {
        toast.error("Failed to update partners");
      }
    } catch (error) {
      toast.error("An error occurred while updating partners");
    }
  };

  const handlePartnerCardClick = (partner: Partner) => {
    if (selectedPartners.some((selected) => selected.id === partner.id)) {
      toast.error("Partner already in Assigned Partners Order list");
    } else {
      const updatedPartners = [...selectedPartners, partner];
      setSelectedPartners(updatedPartners);
    }
  };

  const handleRemovePartner = (partnerIndex: number) => {
    const updatedPartners = [...selectedPartners];
    updatedPartners.splice(partnerIndex, 1);
    setSelectedPartners(updatedPartners);
  };

  const tabs = [
    { statusName: "Partner Priority", value: "partnerPriority" },
    { statusName: "Advance Rule Engine", value: "advanceRuleEngine" },
  ];

  return (
    <>
      <Breadcrum label="Rule Engine" />
      <div className="p-8">
        <div className="flex flex-row customScroll whitespace-nowrap mt-2 lg:h-[34px]">
          {tabs.map(({ statusName, value }, index) => (
            <div
              key={index}
              style={{ borderBottomWidth: "3px" }}
              className={`flex lg:justify-center items-center cursor-pointer border-[#777777] px-6
               ${activeTab === value && "!border-[#004EFF]"}`}
              onClick={() => setActiveTab(value)}
            >
              <span
                className={`text-[#777777] font-medium text-[15px] lg:text-[18px]
                 ${activeTab === value && "!text-[#004EFF] lg:text-[18px]"}`}
              >
                {statusName}
              </span>
            </div>
          ))}
        </div>
        {activeTab === "partnerPriority" && (
          <div className="flex justify-center gap-8 mt-4">
            <div className="bg-white rounded-md shadow-md w-full">
              <div className="flex justify-between items-center p-2 pl-3 pr-4 border-b border-gray-200 bg-gray-100 rounded-t-md shadow-sm">
                <h2 className=" text-base !font-semibold">Partners</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2">
                  {partners
                    .filter(
                      (partner) =>
                        !selectedPartners.some(
                          (selected) => selected.id === partner.id
                        )
                    )
                    .map((partner) => (
                      <OneButton
                        key={partner.id}
                        text={partner.name}
                        onClick={() => handlePartnerCardClick(partner)}
                        variant="secondary"
                        className=" "
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-md shadow-md w-full">
              <div className="flex justify-between items-center p-2 pl-3 pr-4 border-b border-gray-200 bg-gray-100 rounded-t-md shadow-sm">
                <h2 className="text-base !font-semibold">
                  Assigned Partners Order
                </h2>
              </div>
              <div className="p-4">
                <div className="space-y-2 overflow-y-auto h-96">
                  {selectedPartners.map((partner, index) => (
                    <div
                      key={partner.id}
                      className="flex justify-between items-center bg-[#FFFFFF] text-[#004EFF] border border-[#A4A4A4] text-[14px] font-Open font-semibold leading-5 whitespace-nowrap p-2 rounded-md max-w-fit"
                    >
                      <span>
                        {index + 1}. {partner.name}
                      </span>
                      <span
                        onClick={() => handleRemovePartner(index)}
                        className="text-[#BBBBBB] cursor-pointer hover:text-red-700 transition-colors pl-2"
                      >
                        &#10005;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <BottomLayout
              customButtonText="Update"
              callApi={() => {
                handleUpdateClientList();
              }}
              className="lg:w-[150px]"
              Button2Name={true}
              disabled={selectedPartners.length === 0}
            />
          </div>
        )}
        {activeTab === "advanceRuleEngine" && (
          <div className="flex justify-center items-center h-64 mt-4">
            <h2 className="text-lg font-bold text-gray-500">Coming Soon</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default RuleEngine;
