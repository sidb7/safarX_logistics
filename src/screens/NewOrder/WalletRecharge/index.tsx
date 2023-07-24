import NavBar from "../../../layout/NavBar";
import Checkbox from "../../../components/CheckBox";
import CustomButton from "../../../components/Button";
import BannerPagination from "../../../assets/Banner pagination.svg";
import { useNavigate } from "react-router-dom";

const WalletRecharge = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="fixed top-0 z-50 w-full ">
        <NavBar />
      </header>
      <div className="mx-5  mt-[148px]">
        <h1 className="text-[22px] font-semibold leading-7 text-center">
          Welcome to Shipyaari
        </h1>
        <p className="mt-3 text-[#494949] font-light text-center">
          Recharge your wallet with minimum of
          <span className="text-[#323232] font-medium"> ₹100</span>
        </p>
      </div>
      <div className="mx-5 mt-24 rounded-lg border-[1.5px] border-[#E8E8E8] py-6 px-3 drop-shadow-sm">
        <div>
          <h1 className="ml-2 text-[20px] font-medium">
            Benefits of shipyaari wallet
          </h1>
          <div className="flex mt-[26px]">
            <Checkbox checked={true} checkboxClassName="text-black" />
            <p className="ml-2 mt-[2px]">Get Discounts/Offers on Recharge</p>
          </div>
          <div className="flex">
            <Checkbox checked={true} checkboxClassName="text-black" />
            <p className="ml-2 mt-[2px]">Fater order processing</p>
          </div>
          <div className="flex">
            <Checkbox checked={true} checkboxClassName="text-black" />
            <p className="ml-2 mt-[2px]">Instant Payment Processing</p>
          </div>
          <div className="flex">
            <Checkbox checked={true} checkboxClassName="text-black" />
            <p className="ml-2 mt-[2px]">Simplified Accounting</p>
          </div>
        </div>
      </div>
      <div className="mx-5 mt-[84px]">
        <CustomButton
          text={"RECHARGE NOW"}
          onClick={() => navigate("/neworder/rechargepayment")}
        />
      </div>

      <div className="flex justify-center mt-4">
        <p className="text-[14px] text-[#004EFF] font-semibold border-b-2 border-[#004EFF]">
          SKIP FOR NOW{" "}
        </p>
      </div>
      <p className="mx-5 mt-[26px] text-[#494949] text-[12px]">
        NOTE: Recharge is mandatory for shipping orders.
      </p>
      <div className="mt-[26px] flex justify-center">
        <img src={BannerPagination} alt="" />
      </div>
    </div>
  );
};
export default WalletRecharge;
