import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/CloseIcon.svg";
import { CustomTable } from "../../components/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { Tooltip } from "react-tooltip";
import Checkbox from "../../components/CheckBox";
import InfoIcon from "../../assets/info.svg";
import CustomDropDown from "../../components/DropDown";
import ServiceButton from "../../components/Button/ServiceButton";
import InfoIconDisabled from "../../assets/info-circle-disabled.svg";
import {
  GET_COMMUNICATION_RATE_CARD,
  UPDATE_COMMUNICATION_RATE_CARD,
} from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import toast from "react-hot-toast";

interface IDeltaOnBlazeProps {
  setOpenRightModalForDelta: any;
}

const DeltaOnBlaze: React.FunctionComponent<IDeltaOnBlazeProps> = ({
  setOpenRightModalForDelta,
}) => {
  const [communicationChannels, setCommunicationChannels] = useState<any>([]);
  const [filteredRateCard, setFilteredRateCard] = useState<any>([]);
  const [rateCardDetails, setRateCardDetails] = useState({
    rateCardName: "",
    rateCardId: "",
  });
  // console.log("🚀 ~ rateCardDetails:", rateCardDetails);

  // console.log("🚀 ~ communicationChannels----->:", communicationChannels);
  // console.log("🚀 ~ filteredRateCard:", filteredRateCard);

  const ColumnsHelper = createColumnHelper<any>();

  const columns = [
    ColumnsHelper.accessor("template", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              Template
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const TemplateName = info?.row?.original?.templateName;
        const AllAdminCheck = info?.row?.original?.isAdminChecked;

        return (
          <div className="flex gap-x-2">
            <p
              className={`${
                AllAdminCheck
                  ? "font-Open text-sm font-semibold leading-[16px]  text-[#1C1C1C] self-center whitespace-nowrap"
                  : "font-Open text-sm font-semibold leading-[16px]  text-[#E8E8E8] self-center whitespace-nowrap cursor-not-allowed"
              }`}
            >
              {TemplateName || "-"}
            </p>
            <img
              src={AllAdminCheck ? InfoIcon : InfoIconDisabled}
              alt="tooltip-icon"
              className={`${
                AllAdminCheck ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              data-tooltip-id="my-tooltip-delivery-max"
              data-tooltip-content={`${
                TemplateName === "Tracking Updates"
                  ? "Applicable for Pickup, In Transit, Out for delivery and delivered status."
                  : ""
              }`}
            />

            <Tooltip
              id="my-tooltip-delivery-max"
              style={{
                zIndex: 10,
                backgroundColor: "#60D669",
                borderRadius: "6px",
                position: "absolute",
                color: "#FFFFFF",
                width: "270px",
                fontSize: "12px",
                lineHeight: "14px",
                fontFamily: "Open Sans",
                fontWeight: "500",
                letterSpacing: "1px",
                textTransform: "capitalize",
              }}
            />
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("whatsApp", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              WhatsApp
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const channel = info?.row?.original?.communicationChannels.find(
          (channel: any) => channel?.channelName === "Whatsapp"
        );

        const AllAdminCheck =
          info?.row?.original?.isAdminChecked && channel?.isAdminChecked;

        return (
          <div className="flex justify-center">
            <Checkbox
              checkboxClassName={`${
                AllAdminCheck ? "!cursor-pointer" : " !cursor-not-allowed"
              }`}
              checked={channel?.isChecked}
              onChange={(e) =>
                handleCheckboxChange(templateName, "Whatsapp", e.target.checked)
              }
              disabled={!AllAdminCheck}
              name={"WhatsApp"}
              style={{
                accentColor: "black",
                width: "15px",
                height: "15px",
              }}
            />
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("email", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              Email
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const channel = info?.row?.original?.communicationChannels.find(
          (channel: any) => channel?.channelName === "Email"
        );
        const AllAdminCheck =
          info?.row?.original?.isAdminChecked && channel?.isAdminChecked;
        return (
          <div className="flex justify-center">
            <Checkbox
              checkboxClassName={`${
                AllAdminCheck ? "!cursor-pointer" : " !cursor-not-allowed"
              }`}
              // className={`${AllAdminCheck ? "bg-white" : ""}`}
              checked={channel?.isChecked || false}
              onChange={(e) =>
                handleCheckboxChange(templateName, "Email", e.target.checked)
              }
              disabled={!AllAdminCheck}
              name={"Email"}
              style={{
                accentColor: "black",
                width: "15px",
                height: "15px",
              }}
            />
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("sms", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              SMS
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const channel = info?.row?.original?.communicationChannels.find(
          (channel: any) => channel?.channelName === "SMS"
        );
        const AllAdminCheck =
          info?.row?.original?.isAdminChecked && channel?.isAdminChecked;
        return (
          <div className="flex justify-center">
            <Checkbox
              checkboxClassName={`${
                AllAdminCheck ? "!cursor-pointer" : " !cursor-not-allowed"
              }`}
              // className="bg-white"
              checked={channel?.isChecked || false}
              onChange={(e) =>
                handleCheckboxChange(templateName, "SMS", e.target.checked)
              }
              disabled={!AllAdminCheck}
              name={"SMS"}
              style={{
                accentColor: "black",
                width: "15px",
                height: "15px",
              }}
            />
          </div>
        );
      },
    }),

    // currently the phone part is not required

    // ColumnsHelper.accessor("phone", {
    //   header: () => {
    //     return (
    //       <div className="">
    //         <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
    //           Phone
    //         </p>
    //       </div>
    //     );
    //   },

    //   cell: (info: any) => {
    //     const templateName = info?.row?.original?.templateName;
    //     const channel = info?.row?.original?.communicationChannels.find(
    //       (channel: any) => channel?.channelName === "Phone"
    //     );
    //     const AllAdminCheck =
    //       info?.row?.original?.isAdminChecked && channel?.isAdminChecked;
    //     return (
    //       <div className="flex justify-center">
    //         <Checkbox
    //           checkboxClassName={`${
    //             AllAdminCheck ? "!cursor-pointer" : " !cursor-not-allowed"
    //           }`}
    //           className="bg-white"
    //           checked={channel?.isChecked}
    //           onChange={(e) =>
    //             handleCheckboxChange(templateName, "Phone", e.target.checked)
    //           }
    //           disabled={!AllAdminCheck}
    //           name={"Phone"}
    //           style={{
    //             accentColor: "black",
    //             width: "15px",
    //             height: "15px",
    //           }}
    //         />
    //       </div>
    //     );
    //   },
    // }),

    ColumnsHelper.accessor("selectYourCommunication", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              Mode
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const paymentType = info?.row?.original?.paymentType;
        const AllAdminCheck = info?.row?.original?.isAdminChecked;
        return (
          <div className="flex justify-center">
            <CustomDropDown
              heading="Payment Mode"
              disabled={!AllAdminCheck ? true : false}
              selectClassName={`${
                AllAdminCheck
                  ? "!cursor-pointer !h-[32px]"
                  : "!cursor-not-allowed !h-[32px]"
              }`}
              onChange={(e) =>
                handleDropdownChange(templateName, e.target.value)
              }
              value={paymentType}
              options={[
                {
                  label: "All Orders",
                  value: "ALL",
                },
                {
                  label: "COD Orders",
                  value: "COD",
                },
                {
                  label: "Prepaid Orders",
                  value: "PREPAID",
                },
                // {
                //   label: "None (Manual)",
                //   value: "none",
                // },
              ]}
            />
          </div>
        );
      },
    }),
  ];

  const PricingColumns = [
    ColumnsHelper.accessor("channel", {
      header: () => {
        return (
          <div className="">
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              Channel
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const TemplateName = info?.row?.original?.templateName;
        const AllAdminCheck = info?.row?.original?.isAdminChecked;

        return (
          <div className="flex gap-x-2">
            {AllAdminCheck ? (
              <></>
            ) : (
              <p className="font-Open text-sm font-semibold leading-[16px]  text-[#1C1C1C] self-center whitespace-nowrap">
                {TemplateName || "-"}
              </p>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("whatsApp", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              WhatsApp
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const channel = info?.row?.original?.communicationChannels.find(
          (channel: any) => channel?.channelName === "Whatsapp"
        );

        const AllAdminCheck = info?.row?.original?.isAdminChecked;
        return (
          <div className="flex justify-center">
            {AllAdminCheck ? (
              <></>
            ) : (
              <span className="font-Open text-[10px] font-normal leading-4  text-[#1C1C1C]">
                ₹ {channel?.price}
              </span>
            )}
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("email", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              Email
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const channel = info?.row?.original?.communicationChannels.find(
          (channel: any) => channel?.channelName === "Email"
        );
        const AllAdminCheck =
          info?.row?.original?.isAdminChecked || channel?.isAdminChecked;
        return (
          <div className="flex justify-center">
            <span className="font-Open text-[10px] font-normal leading-4  text-[#1C1C1C]">
              ₹ {channel?.price}
            </span>
          </div>
        );
      },
    }),
    ColumnsHelper.accessor("sms", {
      header: () => {
        return (
          <div>
            <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
              SMS
            </p>
          </div>
        );
      },

      cell: (info: any) => {
        const templateName = info?.row?.original?.templateName;
        const channel = info?.row?.original?.communicationChannels.find(
          (channel: any) => channel?.channelName === "SMS"
        );
        const AllAdminCheck =
          info?.row?.original?.isAdminChecked || channel?.isAdminChecked;
        return (
          <div className="flex justify-center">
            <span className="font-Open text-[10px] font-normal leading-4  text-[#1C1C1C]">
              ₹ {channel?.price}
            </span>
          </div>
        );
      },
    }),

    // the phone flow which is currently disabled for now

    // ColumnsHelper.accessor("phone", {
    //   header: () => {
    //     return (
    //       <div className="">
    //         <p className="font-Open text-sm font-semibold leading-4  text-[#1C1C1C] self-center whitespace-nowrap">
    //           Phone
    //         </p>
    //       </div>
    //     );
    //   },

    //   cell: (info: any) => {
    //     const templateName = info?.row?.original?.templateName;
    //     const channel = info?.row?.original?.communicationChannels.find(
    //       (channel: any) => channel?.channelName === "Phone"
    //     );
    //     const AllAdminCheck =
    //       info?.row?.original?.isAdminChecked || channel?.isAdminChecked;
    //     return (
    //       <div className="flex justify-center">
    //         {/* <Checkbox
    //           checkboxClassName={`${
    //             AllAdminCheck ? "!cursor-not-allowed" : "!cursor-pointer"
    //           }`}
    //           className="bg-white"
    //           checked={channel?.isChecked}
    //           onChange={(e) =>
    //             handleCheckboxChange(templateName, "Phone", e.target.checked)
    //           }
    //           disabled={AllAdminCheck}
    //           name={"Phone"}
    //           style={{
    //             accentColor: "black",
    //             width: "16px",
    //             height: "16px",
    //           }}
    //         /> */}

    //         <span className="font-Open text-[10px] font-normal leading-4  text-[#1C1C1C]">
    //           ₹ {channel?.price}
    //         </span>
    //       </div>
    //     );
    //   },
    // }),
  ];

  const handleCheckboxChange = (
    templateName: string,
    channelName: string,
    checked: boolean
  ) => {
    setCommunicationChannels((prevChannels: any) => {
      return prevChannels.map((template: any) => {
        if (template.templateName === templateName) {
          const updatedChannels = template.communicationChannels.map(
            (channel: any) => {
              if (channel.channelName === channelName) {
                return { ...channel, isChecked: checked };
              }
              return channel;
            }
          );
          return { ...template, communicationChannels: updatedChannels };
        }
        return template;
      });
    });
  };

  const handleDropdownChange = (templateName: string, value: string) => {
    setCommunicationChannels((prevChannels: any) => {
      return prevChannels.map((template: any) => {
        if (template.templateName === templateName) {
          return { ...template, paymentType: value };
        }
        return template;
      });
    });
  };

  const handleSave = async () => {
    const payload = {
      rateCardId: rateCardDetails?.rateCardId,
      rateCardName: rateCardDetails?.rateCardName,
      rates: communicationChannels,
    };

    try {
      const { data: response } = await POST(
        UPDATE_COMMUNICATION_RATE_CARD,
        payload
      );

      if (response?.success) {
        toast.success(response?.message);
        setOpenRightModalForDelta(false);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Failed to update communication rate card");
      return error;
    }
  };

  useEffect(() => {
    const fetchCommunicationRateCard = async () => {
      try {
        const response = await POST(GET_COMMUNICATION_RATE_CARD, {});
        // console.log("🚀 ~ fetchCommunicationRateCard ~ response:", response);
        if (response?.data?.success) {
          setRateCardDetails({
            rateCardId: response?.data?.data[0]?.rateCardId || "",
            rateCardName: response?.data?.data[0]?.rateCardName || "",
          });

          const rateCardData = response.data?.data?.[0]?.rates;
          setCommunicationChannels(rateCardData);

          const filteredData = rateCardData
            .filter((template: any) => template.isAdminChecked === true)
            .map((template: any) => ({
              templateName: template.templateName,
              communicationChannels: template.communicationChannels.filter(
                (channel: any) => channel.isAdminChecked === true
              ),
            }));
          setFilteredRateCard(filteredData);
        } else {
          toast.error("Failed to fetch communication rate card");
        }
      } catch (error) {
        console.error("Error fetching communication rate card:", error);
      }
    };

    fetchCommunicationRateCard();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between p-5">
          <p className="font-Lato font-normal text-2xl text-[#323232] leading-8">
            Delivery Max
          </p>
          <img
            src={CloseIcon}
            alt="close-icon"
            onClick={() => setOpenRightModalForDelta(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="h-[calc(100vh-90px)] overflow-y-scroll pb-7">
          <div>
            <p className="font-Open font-semibold text-lg  text-[#1C1C1C] leading-[22px] px-5 pt-5">
              Setup Your Communication
            </p>
            <div className="p-2">
              <CustomTable
                columns={columns}
                data={communicationChannels || []}
                thclassName={"!pb-4"}
                tdclassName={"border-0 border-b !pb-[16px]"}
                trclassName={"!shadow-none !rounded-none"}
              />
            </div>
          </div>
          <div>
            <p className="font-Open font-semibold text-lg  text-[#1C1C1C] leading-[22px] px-5 pt-5">
              Pricing
            </p>
            <div className="p-2">
              <CustomTable
                columns={PricingColumns}
                data={filteredRateCard || []}
                thclassName={"!pb-4"}
                tdclassName={"border-0 border-b !pb-[16px]"}
                trclassName={"!shadow-none !rounded-none"}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex justify-end gap-x-5 shadow-lg border-[1px] h-[68px] bg-[#FFFFFF] px-6 py-4 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0"
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"ACTIVATE"}
          onClick={handleSave}
          className="!bg-[#60D669] !border-[#60D669] h-[36px] !text-[#FFFFFF] !px-4 !py-2 !font-Open !font-semibold !text-[14px] !leading-5 !rounded-[4px] hover:!bg-[#27B031] hover:!shadow-cardShadow2a focus:!bg-[#60D669] focus:border focus:!border-[#27B031]"
        />
      </div>
    </>
  );
};

export default DeltaOnBlaze;
