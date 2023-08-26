import Cross from "../../../assets/cross.svg";
import shieldTick from "../../../assets/shield-tick.svg";
import shieldcross from "../../../assets/shieldcross.svg";
import Checkbox from "../../../components/CheckBox";
import CodIcon from "../../../assets/codIcon.svg";
import toggle from "../../../assets/toggle-off-circle.svg";
import CustomInputBox from "../../../components/Input";
import ServiceButton from "../../../components/Button/ServiceButton";
import { POST } from "../../../utils/webService";
// import { GET_PACKAGE_INSURANCE } from "../../../utils/ApiUrls";
import { GET_LATEST_ORDER, ADD_COD_INFO } from "../../../utils/ApiUrls";
import Switch from "react-switch";
import { useEffect, useState } from "react";

interface IProps {
  insurance: any;
  setInsurance: Function;
  codData1?: any;
}

const AddInsuranceModal = (props: IProps) => {
  const { codData1 } = props;
  console.log("codData1", codData1);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [productInsurance, setProductInsurance] = useState({});
  const [codData, setCodData] = useState<any>(codData1);

  const { insurance, setInsurance } = props;

  useEffect(() => {
    console.log("codData1.isCOD", codData1);
    if (codData1.isCOD) {
      setToggleStatus(true);
    }
  }, [codData1]);

  const postCodDetails = async () => {
    // console.log("postCodDetails", toggleStatus);

    const payload = {
      paymentType: "COD",
      codCollectAmount: codData.codAmount,
      invoiceValue: codData.invoiceValue,
    };

    const { data } = await POST(ADD_COD_INFO, payload);

    if (data?.success) {
      setInsurance({
        codInfo: codData,
      });
      console.log("POST_PACKAGE", data);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await POST(GET_LATEST_ORDER);
  //     const payload = {
  //       status: true,
  //       collectableAmount: 120,
  //       totalAmount: 220,
  //     };
  //     const { data: insruanceInfo } = await POST(
  //       GET_PACKAGE_INSURANCE,
  //       payload
  //     );

  //     if (data?.success) {
  //       if (data?.data?.codInfo) {
  //         setCodData({
  //           ...codData,
  //           codAmount: data?.data?.codAmount,
  //           invoiceValue: data?.data?.invoiceValue,
  //         });
  //       }
  //     }
  //   })();
  // }, []);
  return (
    <div>
      <div className="flex justify-between items-center p-5">
        <div className="flex gap-x-2 items-center">
          <img src={shieldTick} alt="" className="w-6 h-6" />
          <p className="font-Lato text-2xl">Add Insurance</p>
        </div>
        <div onClick={() => setInsurance()}>
          <img src={Cross} alt="" className="w-6 h-6" />
        </div>
      </div>
      <div className="flex justify-center shadow-lg border-2 p-5 mx-5 gap-x-8 rounded-lg relative">
        <div className="flex flex-col justify-center items-center border-2 border-[] py-8 px-28 rounded-md ">
          <img src={shieldTick} alt="" className="w-16 h-12" />
          <p className="absolute top-2 left-12 bg-white">I want insurance</p>
        </div>
        <div className="flex flex-col justify-center items-center border-2 border-[] py-8 px-28 rounded-md">
          <img src={shieldcross} alt="" className="w-16 h-12" />
          <div className="flex absolute top-2 left-[335px] bg-white">
            <Checkbox checked={true} />
            <p>I'll take risk</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between my-10 px-5">
        <div className="flex gap-x-2 items-center">
          <img src={CodIcon} alt="" />
          <p className="whitespace-nowrap text-2xl">Add COD</p>
        </div>

        <button
          className={`${
            toggleStatus ? "bg-[#7CCA62]" : "bg-[#F35838]"
          } flex justify-center items-center gap-x-2 rounded w-[140px] h-[30px] px-[12px] py-[18px]`}
        >
          <Switch
            onChange={() => {
              setToggleStatus(!toggleStatus);
            }}
            checked={toggleStatus}
            onColor="#FFFFF"
            onHandleColor="#7CCA62"
            offColor="#FFFFF"
            offHandleColor="#F35838"
            handleDiameter={4}
            uncheckedIcon={false}
            checkedIcon={false}
            height={18}
            width={24}
          />
          <p className="text-[#FFFFFF] flex justify-center font-semibold font-Open text-[14px]  ">
            {toggleStatus ? "ACTIVATE" : "DEACTIVATE"}
          </p>
        </button>
      </div>
      {toggleStatus && (
        <div className="px-5 flex flex-col gap-y-4">
          <CustomInputBox
            label={"COD amount to collect from buyer"}
            // isDisabled={toggleStatus}
            value={codData?.codAmount}
            inputType="number"
            onChange={(e) => {
              setCodData({ ...codData, codAmount: e.target.value });
              console.log(codData);
            }}
          />
          <CustomInputBox
            inputType="number"
            label={"Total invoice value"}
            // isDisabled={toggleStatus}
            value={codData?.invoiceValue}
            onChange={(e) =>
              setCodData({ ...codData, invoiceValue: e.target.value })
            }
          />
        </div>
      )}
      <div
        className="hidden lg:flex justify-end  shadow-lg border-[1px]  bg-[#FFFFFF] p-6  rounded-tr-[32px] rounded-tl-[32px]    fixed bottom-0 "
        style={{ width: "-webkit-fill-available" }}
      >
        <ServiceButton
          text={"NEXT"}
          className="bg-[#1C1C1C] text-[#FFFFFF] lg:!py-2 lg:!px-4 "
          onClick={() => postCodDetails()}
        />
      </div>
    </div>
  );
};
export default AddInsuranceModal;
