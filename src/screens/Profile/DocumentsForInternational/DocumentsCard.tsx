import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import LabelContainer from "../../../components/LabelContainer";
import shareIcon from "../../../assets/ShareIcon.svg";

interface IDocumentCardProps {}

const DocumentCard: React.FunctionComponent<IDocumentCardProps> = (props) => {
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  let userInfo = localStorage.getItem("userInfo") as any;
  userInfo = JSON.parse(userInfo);

  const renderIndividualDocument = () => {
    return (
      <>
        <div className="flex flex-col p-5">
          <LabelContainer
            label="Sign With Stamp"
            info={`Signature.pdf`}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
            className="text-[12px] xl:whitespace-nowrap"
          />
        </div>
      </>
    );
  };

  const renderCompanyDocument = () => {
    return (
      <>
        <div
          className={`flex flex-col  ${
            isItLgScreen ? "border-l-[1px] mt-5 px-5" : "mt-5 px-5"
          }`}
        >
          <LabelContainer
            label="Certificate of Incorporation"
            className="text-[12px] xl:whitespace-nowrap"
            info={"Incorporation.pdf"}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>

        <div className="flex flex-col mt-5 px-5 border-l-[1px]">
          <LabelContainer
            label="AD Code"
            className="text-[12px]"
            info={"123356"}
            classNameInfo="!text-[14px]"
          />
        </div>

        <div
          className={`flex flex-col  ${
            isItLgScreen ? "border-l-[1px] mt-5 px-5" : "mt-5 px-5"
          }`}
        >
          <LabelContainer
            label="AD File"
            className="text-[12px] xl:whitespace-nowrap"
            info={"AD.file.pdf"}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>

        <div className="flex flex-col my-5 px-5 border-l-[1px]">
          <LabelContainer
            label="IEC Code"
            className="text-[12px] xl:whitespace-nowrap"
            info={"987652723322"}
            classNameInfo="!text-[14px]"
          />
        </div>

        <div
          className={`flex flex-col  ${
            isItLgScreen ? "border-l-[1px] mt-5 px-5" : "mb-5 px-5"
          }`}
        >
          <LabelContainer
            label="IEC File"
            className="text-[12px] xl:whitespace-nowrap"
            info={"file.pdf"}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>

        <div className="flex flex-col mb-5 px-5 border-l-[1px]">
          <LabelContainer
            label="Sign With Stamp"
            className="text-[12px] xl:whitespace-nowrap"
            info={"signature.pdf"}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>

        <div
          className={`flex flex-col  ${
            isItLgScreen ? "border-l-[1px] mb-5 px-5" : "mb-5 px-5"
          }`}
        >
          <LabelContainer
            label="Certificate of Registration"
            className="text-[12px] xl:whitespace-nowrap"
            info={`registration.pdf`}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>

        <div className="flex flex-col mb-5 px-5 border-l-[1px]">
          <LabelContainer
            label="Board Resolution of Authority"
            className="text-[12px] xl:whitespace-nowrap"
            info={`authority.pdf`}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>

        <div
          className={`flex flex-col  ${
            isItLgScreen ? "border-l-[1px] mb-5 px-5" : "mb-5 px-5"
          }`}
        >
          <LabelContainer
            label="Registered Office Address Proof"
            className="text-[12px] xl:whitespace-nowrap"
            info={`Address.pdf`}
            classNameInfo="!text-[14px] !text-[#004EFF]"
            viewIconVisible={true}
          />
        </div>
      </>
    );
  };

  const renderDocument = () => {
    if (userInfo && userInfo?.businessType === "INDIVIDUAL") {
      return renderIndividualDocument();
    } else if (userInfo && userInfo?.businessType === "COMPANY") {
      return renderCompanyDocument();
    } else {
      return <div>No documents available</div>;
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("userInfo") as any;
    data = JSON.parse(data);

    if (data !== "" && data !== null) {
      setUserData(data);
    }
  }, []);
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
              onClick={() => {
                navigate("/profile/document", { state: { data: userData } });
              }}
            />
          </div>
        </div>

        {/* {!isItLgScreen ? (
          <div>
            <div className="grid grid-cols-2 ml-4 mt-2">
            {userInfo?.businessType === "INDIVIDUAL" ? renderIndividualDocument() : renderCompanyDocument()}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-y-8">
            {userInfo?.businessType === "INDIVIDUAL" ? renderIndividualDocument() : renderCompanyDocument()}
          </div>
        )} */}
        <div
          className={`${
            isItLgScreen
              ? "grid grid-cols-5 gap-y-8"
              : "grid grid-cols-2 ml-4 mt-2"
          }`}
        >
          {renderDocument()}
        </div>
      </div>
    </>
  );
};

export default DocumentCard;
