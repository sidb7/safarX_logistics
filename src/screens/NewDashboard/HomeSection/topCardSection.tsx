import React from "react";
import OneButton from "../../../components/Button/OneButton";
import { useNavigate } from "react-router-dom";
import successStatus from "../../../assets/success.svg";

interface ITopCardSectionProps {
  completedStatus: any;
}

const TopCardSection: React.FunctionComponent<ITopCardSectionProps> = ({
  completedStatus,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className=" my-7 lg:mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 ">
        {/* first card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #FD88B3 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="  pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] leading-6 font-semibold xl:leading-8 text-[#1C1C1C]">
                {completedStatus?.qna
                  ? "You're all set!"
                  : "Let's get you started!"}
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus.qna
                  ? "Your setup is complete. You can now enjoy a personalized Shipyaari experience."
                  : "Set up your account for a personalized Shipyaari experience and seamless logistics."}
              </p>
            </div>
            {!completedStatus?.qna ? (
              <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
                <OneButton
                  text={"CLICK HERE"}
                  onClick={() => navigate("/onboarding/get-started")}
                  variant="tertiary"
                  className="!bg-transparent"
                />
              </div>
            ) : (
              <div className="flex gap-x-1 items-center text-center  justify-end pr-[10px] pb-[20px] absolute bottom-0 right-0 ">
                {/* <img src={successStatus} alt="successStatus" /> */}
                <span className="text-[15px] font-bold font-Open leading-5 text-[#43be43] underline underline-offset-4">
                  Your setup is complete!
                </span>
              </div>
            )}
          </div>
        </div>
        {/* second card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #88E7FD 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="  pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] font-semibold leading-6  xl:leading-8 text-[#1C1C1C]">
                Sync your Channel
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus?.channelIntegrated
                  ? "Your channel has been successfully synced with Shipyaari."
                  : "Integrate your channel for a seamless Shipping Experience."}
              </p>
            </div>
            {!completedStatus?.channelIntegrated ? (
              <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
                <OneButton
                  text={"SYNC MY STORE"}
                  onClick={() => {
                    navigate("/catalogues/channel-integration");
                  }}
                  variant="tertiary"
                  className="!bg-transparent"
                />
              </div>
            ) : (
              <div className="flex gap-x-2 items-center text-center  justify-end pr-[10px] pb-[20px] absolute bottom-0 right-0 ">
                <img src={successStatus} alt="successStatus" />
                <span className="text-[15px] font-bold font-Open leading-5 text-[#43be43]">
                  Channel Synced!
                </span>
              </div>
            )}
          </div>
        </div>
        {/* third card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #88FDDA 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="  pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] font-semibold leading-6 xl:leading-8 text-[#1C1C1C]">
                {completedStatus?.walletRecharge
                  ? "Top up your Wallet"
                  : "Time to Fill the Wallet Tank"}
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus?.walletRecharge
                  ? "Enjoy hassle-free payments and quick access to your favorite services!"
                  : "Fill up your wallet and speed up your business. Quick top-ups for smooth, unstoppable growth."}
              </p>
            </div>
            <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0 ">
              <OneButton
                text={"WALLET RECHARGE"}
                onClick={() => navigate("/wallet/view-wallet")}
                variant="tertiary"
                className=" !bg-transparent"
              />
            </div>
          </div>
        </div>
        {/* fourth card  */}
        <div
          className="rounded-xl border-[1px] border-[#E8E8E8] shadow-md relative h-[161px]"
          style={{
            background:
              "radial-gradient(147.39% 166.25% at 106.91% -8.82%, #88A9FD 0%, #FFF 50.67%)",
          }}
        >
          <div className="flex flex-col gap-y-5 pt-5">
            <div className="pl-[15px] pr-[21px]">
              <p className="font-Open text-base xl:text-[18px] font-semibold leading-6 xl:leading-8 text-[#1C1C1C]">
                {completedStatus?.returningUser
                  ? "Place a quick order!"
                  : "Add Your First Order Manually"}
              </p>
              <p className="font-Open text-[13px] xl:text-[15px] font-normal leading-[18px] xl:leading-5 text-[#494949] tracking-wide xl:tracking-normal">
                {completedStatus?.returningUser
                  ? "Your first order is just the beginning! Let's make shipping stress-free for you!"
                  : "Lets take a plunge and start our yaari. Add your first order Manually."}
              </p>
            </div>
            <div className="flex justify-end pr-[10px] pb-[10px] absolute bottom-0 right-0">
              <OneButton
                text={"CREATE ORDER"}
                onClick={() => navigate("/orders/quick-order-place")}
                variant="tertiary"
                className=" !bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCardSection;
