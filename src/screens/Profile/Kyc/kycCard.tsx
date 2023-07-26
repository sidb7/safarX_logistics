import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/Profile/EditIcon.svg";
import LabelContainer from "../../../components/LabelContainer";
export const ProfileKycCard = () => {
  const navigate = useNavigate();
  const isItLgScreen = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div
      className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-4`}
    >
      <div
        className={`flex justify-between items-center h-[44px] bg-[#F6F6F6]`}
      >
        <div>
          <span className="text-base font-semibold text-[#1C1C1C] ml-4">
            KYC Details
          </span>
        </div>
        <div>
          <img
            src={EditIcon}
            alt=""
            className="mr-4"
            onClick={() => navigate("/profile/profileEdit-kyc")}
          />
        </div>
      </div>

      {!isItLgScreen ? (
        <div>
          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="User Name" info="Bunty" />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="GST Details"
                className={"ml-3"}
                info="HD35K3JDT4D5D2"
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer label="Aadhar Details" info="114626443" />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="PAN Details"
                className={"ml-3"}
                info="DI4RI4IR3"
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 mt-2">
            <div className="flex flex-col">
              <LabelContainer
                label="Plot no, Sector"
                info="Plot no. 8 Sector 1"
              />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="Locality, Landmark"
                className={"ml-3"}
                info="Locality details"
                classNameInfo="ml-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 ml-4 my-2">
            <div className="flex flex-col">
              <LabelContainer label="City, Pin code" info="Mumbai 324212" />
            </div>

            <div className="flex flex-col border-[#E8E8E8] border-l-[1px]">
              <LabelContainer
                label="State, Country"
                className="ml-3"
                info="Maharashtra, India"
                classNameInfo="ml-3"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-y-8">
          <div className="flex flex-col mt-5 px-5">
            <LabelContainer
              label="User Name"
              className="text-[12px]"
              info="Bunty"
              classNameInfo="!text-[14px]"
            />
          </div>
          <div className="flex flex-col border-[#E8E8E8] border-l-[1px] mt-5 px-5">
            <LabelContainer
              label="GST Details"
              className="text-[12px]"
              info="HD35K3JDT4D5D2"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mt-5 px-5 border-l-[1px]">
            <LabelContainer
              label="Aadhar Details"
              className="text-[12px]"
              info="114626443"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-[#E8E8E8] border-l-[1px] mt-5 px-5">
            <LabelContainer
              label="PAN Details"
              className="text-[12px]"
              info="DI4RI4IR3"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-l-[1px] mt-5 px-5">
            <LabelContainer
              label="Plot no, Sector"
              className="text-[12px]"
              info="Plot no. 8 Sector 1"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-[#E8E8E8] mb-5 px-5">
            <LabelContainer
              label="Locality, Landmark"
              className="text-[12px]"
              info="Locality details"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col mb-5 px-5 border-l-[1px]">
            <LabelContainer
              label="City, Pin code"
              className="text-[12px]"
              info=" Mumbai 324212"
              classNameInfo="!text-[14px]"
            />
          </div>

          <div className="flex flex-col border-[#E8E8E8] border-l-[1px] mb-5 px-5">
            <LabelContainer
              label="State, Country"
              className="text-[12px]"
              info="Maharashtra, India"
              classNameInfo="!text-[14px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};
