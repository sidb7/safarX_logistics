import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import LabelContainer from "../../../components/LabelContainer";
import shareIcon from "../../../assets/ShareIcon.svg";

interface IDocumentCardProps {}

const DocumentCard: React.FunctionComponent<IDocumentCardProps> = (props) => {
  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  let userInfo = localStorage.getItem("userInfo") as any;
  userInfo = JSON.parse(userInfo);
  console.log("🚀 ~ userInfo:", userInfo?.businessType);

  return (
    <>
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
      >
        <div
          className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
        >
          <div>
            <span className="font-Open text-base font-semibold leading-[22px] text-[#1C1C1C] ml-4">
              Documents
            </span>
          </div>
          <div>
            <img
              src={EditIcon}
              alt=""
              className="mr-4 cursor-pointer"
              onClick={() => {}}
            />
          </div>
        </div>

        {!isItLgScreen ? (
          <div>
            <div className="grid grid-cols-2 ml-4 mt-2">
              <div className="flex flex-col">
                <LabelContainer label="Full Name" info={"John Doe"} />
              </div>

              {/* <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Last Name"
                className={"ml-3"}
                classNameInfo="ml-3"
                info={KycDetails?.lastName}
              />
            </div> */}
            </div>

            <div className="grid grid-cols-2 ml-4 mt-2">
              <div className="flex flex-col">
                <LabelContainer label="Aadhar Details" info={"123456789123"} />
              </div>

              <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
                <LabelContainer
                  label="GST Details"
                  className={"ml-3"}
                  info={"123456789123"}
                  classNameInfo="ml-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 ml-4 mt-2">
              <div className="flex flex-col">
                <LabelContainer label="PAN Details" info={"123456789123"} />
              </div>

              <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
                <LabelContainer
                  label="Plot no, Sector"
                  info={"123456789123"}
                  className={"ml-3"}
                  classNameInfo="ml-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 ml-4 mt-2">
              <div className="flex flex-col">
                <LabelContainer label="Locality, Landmark" info={"locality"} />
              </div>

              <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
                <LabelContainer
                  label="City, Pin code"
                  info={`${"Delhi"}, ${"110092"} `}
                  className={"ml-3"}
                  classNameInfo="ml-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 ml-4 my-2">
              <div className="flex flex-col">
                <LabelContainer
                  label="State, Country"
                  info={`${"state"} , ${"country"}`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-y-8">
            <div className="flex flex-col mt-5 px-5 border-l-[1px]">
              <LabelContainer
                label="First Name"
                className="text-[12px]"
                info={"John Doe"}
                classNameInfo="!text-[14px]"
              />
            </div>

            {/* <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Last Name"
              className="text-[12px]"
              info={KycDetails?.lastName}
              classNameInfo="!text-[14px]"
            />
          </div> */}

            {/* <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Middle Name"
              className="text-[12px]"
              info={KycDetails?.middleName}
              classNameInfo="!text-[14px]"
            />
          </div> */}

            <div className="flex flex-col mt-5 px-5 border-l-[1px]">
              <LabelContainer
                label="GST Details"
                className="text-[12px]"
                info={""}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mt-5 px-5 border-l-[1px]">
              <LabelContainer
                label="Aadhar Details"
                className="text-[12px]"
                info={"123456789123"}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mt-5 px-5 border-l-[1px]">
              <LabelContainer
                label="PAN Details"
                className="text-[12px]"
                info={""}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mb-5 px-5 border-l-[1px]">
              <LabelContainer
                label="Plot no, Sector"
                className="text-[12px]"
                info={""}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mb-5 px-5 border-l-[1px]">
              <LabelContainer
                label="Locality, Landmark"
                className="text-[12px]"
                info={""}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mb-5 px-5 border-l-[1px]">
              <LabelContainer
                label="City, Pin code"
                className="text-[12px]"
                info={`${"city"}, ${"pincode"} `}
                classNameInfo="!text-[14px]"
              />
            </div>

            <div className="flex flex-col mb-5 px-5 border-l-[1px]">
              <LabelContainer
                label="State, Country"
                className="text-[12px]"
                info={`${"state"} , ${"country"}`}
                classNameInfo="!text-[14px]"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DocumentCard;
