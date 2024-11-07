import React, { useState } from "react";
import { LARGE_LOGO, LOGO_AND_BRAND } from "../../../../utils/ApiUrls";
import CloseIcon from "../../../../assets/CloseIcon.svg";
import VerificationGif from "../../../../assets/Business verifying the identity of customers (1).gif";
import CustomInputBox from "../../../../components/Input";
import OneButton from "../../../../components/Button/OneButton";
import toast from "react-hot-toast";
import { POST } from "../../../../utils/webService";
import { Spinner } from "../../../../components/Spinner";

interface ICompanyNameContentProps {
  setOpenCentreModal: React.Dispatch<React.SetStateAction<any>>;
}

const CompanyNameContent: React.FunctionComponent<ICompanyNameContentProps> = ({
  setOpenCentreModal,
}) => {
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ loading:", loading);
  const [brandingDetails, setBrandingDetails] = useState<any>({
    image: "",
    imageUrl: "",
    brandName: "",
    companyName: "",
    file: null,
  });

  const isFormValid = () => {
    return brandingDetails.companyName.trim() !== "";
  };

  const updateBrandingDetails = async () => {
    if (!isFormValid()) {
      return toast.error("The above field is required.");
    }

    let formData = new FormData();

    formData.append("companyName", brandingDetails.companyName);
    setLoading(true);
    const { data } = await POST(LOGO_AND_BRAND, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // setBrandLoadingState(true);
    setLoading(true);
    if (data?.success) {
      toast.success(data?.message);
      setLoading(false);
      setOpenCentreModal(false);
      //   setBrandLoadingState(false);
      //   localStorage.setItem("brandDetails", "true");
      //   setBrandingModal(false);
      window.location.reload();
      // getProfileData();
    } else {
      toast.error(data?.message);
      //   setBrandLoadingState(null);
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            <Spinner />
          </div>
        </>
      ) : (
        <>
          <div className="product-box  bg-white flex justify-between items-center w-full h-[60px] top-0 px-5">
            <img src={LARGE_LOGO} alt="company-logo" className="h-[25px]" />
            <img
              src={CloseIcon}
              alt="close-icon"
              onClick={() => setOpenCentreModal(false)}
              className="cursor-pointer"
            />
          </div>
          <div>
            <img src={VerificationGif} alt="" width={168} height={168} />
          </div>
          <div className=" px-5 md:m-5 flex flex-col justify-center gap-y-5 items-center">
            <p className="font-Lato font-bold text-[22px] text-center leading-[26px] md:tracking-wider text-[#323232]">
              Your KYC is almost complete!
            </p>
            <p className="font-Open font-normal text-sm text-center leading-5 md:tracking-wide text-[#494949]">
              We couldn’t retrieve your company’s registered name from the
              GSTIN. Kindly provide this below.
            </p>
            <div className="flex justify-center items-center gap-x-5 py-3">
              <span className="font-Lato font-semibold text-[18px] text-center leading-[24px] md:tracking-wide text-[#1C1C1C]">
                Enter Your Company Name
              </span>
              <div className="md:min-w-[240px]">
                <CustomInputBox
                  label="Company Name"
                  containerStyle={`lg:!w-auto`}
                  //   className="font-Open !w-[320px] md:!w-[370px]"
                  labelClassName="!font-Open"
                  onChange={(e: any) =>
                    setBrandingDetails({
                      ...brandingDetails,
                      companyName: e.target.value,
                    })
                  }
                  value={brandingDetails.companyName}
                />
              </div>
            </div>
            <OneButton
              variant="primary"
              className={`text-[#FFF] text-[14px] flex gap-2 items-center  bg-black cursor-pointer rounded px-4 py-2 border-black border-2 font-Open tracking-wide text-sm font-semibold leading-5  disabled:opacity-50 disabled:cursor-not-allowed `}
              text={loading ? "SUBMITTING..." : "SUBMIT"}
              onClick={updateBrandingDetails}
              disabled={!isFormValid() || loading}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CompanyNameContent;
