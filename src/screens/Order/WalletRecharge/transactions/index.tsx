import React, { useEffect, useState } from "react";
import WebCloseIcon from "../../../../assets/CloseIcon.svg";
import TransactionIcon from "../../../../assets/Transaction/receipt-item.svg";
import CustomButton from "../../../../components/Button";
import { ResponsiveState } from "../../../../utils/responsiveState";
import LabelContainer from "../../../../components/LabelContainer";
import CustomInputBox from "../../../../components/Input";
import TransactionReverseIcon from "../../../../assets/transactionReverseButton.svg";
import { POST } from "../../../../utils/webService";
import {
  GET_WALLET_BALANCE,
  POST_WALLET_BALANCE,
} from "../../../../utils/ApiUrls";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import TickGif from "../../../../assets/tick.gif";
import toast from "react-hot-toast";
import ServiceButton from "../../../../components/Button/ServiceButton";
import { Spinner } from "../../../../components/Spinner";

interface IIndexProps {
  setOpenRightModal?: any;
}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const { setOpenRightModal } = props;
  // const { isLgScreen } = ResponsiveState();
  const [openCenterModal, setOpenCenterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [migratedUserWalletDetails, setMigratedUserWalletDetails] =
    useState<any>({});

  const [swap, setSwap] = useState(false);

  const [userDetails, setUserDetails] = useState<any>({
    sellerId: "",
    email: "",
    phpUserId: "",
  });
  const [amountForTransaction, setAmountForTransaction] = useState<any>({
    phpAmount: 0,
    blazeAmount: 0,
  });

  const userDetailsFromSession = () => {
    let temp: any = sessionStorage.getItem("userInfo");
    temp = JSON.parse(temp);

    setUserDetails({
      ...userDetails,
      sellerId: temp?.sellerId,
      email: temp?.email,
      phpUserId: temp?.phpUserId,
    });
  };

  const getWalletBalance = async () => {
    try {
      setLoading(true);
      const { data: response } = await POST(GET_WALLET_BALANCE);

      if (response?.success) {
        setMigratedUserWalletDetails(response?.data);
        setAmountForTransaction({
          ...amountForTransaction,
          phpAmount:
            response?.data?.phpBalance !== undefined
              ? response.data.phpBalance === 0
                ? 0
                : response.data.phpBalance
              : "N/A",
          blazeAmount:
            response?.data?.blazeBalance !== undefined
              ? response.data.blazeBalance === 0
                ? 0
                : response.data.blazeBalance
              : "N/A",
        });
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch {
      toast.error("Failed to fetch wallet details!");
      setLoading(false);
      return;
    }
  };

  const oldSyDetailsCard = () => {
    return (
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-2`}
      >
        <div
          className={`flex justify-between items-center px-2 py-4 bg-[#F6F6F6]`}
        >
          <div>
            <span className="text-base font-semibold font-Open leading-[22px]">
              Old Shipyaari Site
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x px-4 pt-3 pb-4">
          <div className="">
            <LabelContainer
              label="Old Shipyaari ID"
              info={userDetails?.phpUserId}
            />
          </div>

          <div className="">
            <LabelContainer
              label="Mail ID"
              className={"ml-3"}
              info={userDetails?.email}
              classNameInfo="ml-3 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
            />
          </div>
        </div>
        <div className="px-4 pb-4">
          <LabelContainer
            label="Wallet Balance"
            info={`₹ ${migratedUserWalletDetails?.phpBalance || 0.0}`}
          />
        </div>
      </div>
    );
  };

  const blazeDetailsCard = () => {
    return (
      <div
        className={`border-[1px] border-[#E8E8E8] rounded-lg overflow-hidden grid grid-rows-1 mt-2`}
      >
        <div
          className={`flex justify-between items-center px-2 py-4 bg-[#F6F6F6]`}
        >
          <div>
            <span className="text-base font-semibold font-Open leading-[22px]">
              Blaze
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 divide-x px-4 pt-3 pb-4">
          <div className="">
            <LabelContainer label="Shipyaari ID" info={userDetails?.sellerId} />
          </div>

          <div className="">
            <LabelContainer
              label="Mail ID"
              className={"ml-3"}
              info={userDetails?.email}
              classNameInfo="ml-3 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
            />
          </div>
        </div>
        <div className="px-4 pb-4">
          <LabelContainer
            label="Wallet Balance"
            info={`₹ ${migratedUserWalletDetails?.blazeBalance || 0.0}`}
          />
        </div>
      </div>
    );
  };

  const onSendButton = async () => {
    let payload = {
      apiStatus: "",
      amount: "",
    };

    if (swap) {
      payload.apiStatus = "BLAZETOPHP";
      payload.amount = amountForTransaction?.blazeAmount;
    } else {
      payload.apiStatus = "PHPTOBLAZE";
      payload.amount = amountForTransaction?.phpAmount;
    }

    try {
      if (swap && payload.amount > migratedUserWalletDetails.blazeBalance) {
        toast.error("Your Current Blaze Balance is low");
        return;
      } else if (
        !swap &&
        payload.amount > migratedUserWalletDetails.phpBalance
      ) {
        toast.error(
          "You dont have sufficient balance to make this transaction"
        );
        return;
      } else {
        setLoading(true);
        const { data: response } = await POST(POST_WALLET_BALANCE, payload);
        if (response?.success) {
          toast.success(response?.message);
          setOpenCenterModal(true);
        } else {
          toast.error(response?.message);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error in getWalletBalance API", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect

  useEffect(() => {
    getWalletBalance();
    userDetailsFromSession();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-[800px]">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="flex flex-col p-5 gap-y-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-2">
                <img src={TransactionIcon} alt="transaction icon" />
                <p className="text-2xl font-Lato font-normal leading-8 text-[#1C1C1C]">
                  Transaction
                </p>
              </div>

              <div>
                <img
                  src={WebCloseIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={setOpenRightModal}
                />
              </div>
            </div>

            <div className="px-5">
              <p className="font-Lato text-[20px] font-medium leading-[26px] text-[#202427]">
                Transfer From
              </p>
            </div>

            {swap ? blazeDetailsCard() : oldSyDetailsCard()}
            {/* input box for amount */}
            <div className="flex pt-4 pb-2 gap-x-6 items-center">
              <div>
                <CustomInputBox
                  label="Enter Amount"
                  className="lg:!w-full xl:!w-[400px]"
                  value={` ${
                    swap
                      ? amountForTransaction?.blazeAmount || ""
                      : amountForTransaction?.phpAmount || ""
                  }`}
                  inputMode="numeric"
                  onChange={(e: any) => {
                    if (swap) {
                      if (isNaN(e.target.value)) {
                      } else {
                        setAmountForTransaction({
                          ...amountForTransaction,
                          blazeAmount: Number(e.target.value),
                        });
                      }
                    } else if (isNaN(e.target.value)) {
                    } else {
                      setAmountForTransaction({
                        ...amountForTransaction,
                        phpAmount: Number(e.target.value),
                      });
                    }
                  }}
                />
              </div>
              <div onClick={() => setSwap(!swap)} className="cursor-pointer">
                <img
                  src={TransactionReverseIcon}
                  alt="reverse the transaction"
                />
              </div>
            </div>

            <div className="px-5">
              <p className="font-Lato text-[20px] font-medium leading-[26px] text-[#202427]">
                Transfer To
              </p>
            </div>

            {/* blaze */}
            {swap ? oldSyDetailsCard() : blazeDetailsCard()}
          </div>

          <div
            className="hidden lg:flex justify-end shadow-lg border-[1px]  bg-[#FFFFFF] p-5 rounded-tr-[32px] rounded-tl-[32px] fixed bottom-0 "
            style={{ width: "-webkit-fill-available" }}
          >
            <div className="flex h-full w-full justify-end gap-x-6">
              <CustomButton
                text="Send"
                onClick={onSendButton}
                className="!w-[100px] !rounded"
              />
            </div>
          </div>
        </div>
      )}

      <CenterModal
        isOpen={openCenterModal}
        onRequestClose={() => setOpenCenterModal(false)}
        className="!flex !justify-center !items-center lg:!w-[50%] lg:!h-[35%] xl:!w-[30%] xl:!h-[32%]"
      >
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center mb-6">
              <img src={TickGif} alt="" width={124} height={124} />
              <p className="font-bold text-[16px] text-[#1C1C1C] font-Open leading-[22px]">
                Congratulations!
              </p>

              <p className="font-bold text-[16px] text-[#1C1C1C] text-center font-Open leading-[22px] px-6 md:px-0">
                {`You have send ₹ ${
                  swap
                    ? amountForTransaction?.blazeAmount
                    : amountForTransaction?.phpAmount
                } Successfully ${
                  swap ? "to Your Old S.Y Account" : "to Your Blaze Account"
                }`}
              </p>
            </div>

            <ServiceButton
              text="DONE"
              onClick={() => {
                setOpenCenterModal(false);
                setOpenRightModal(false);
              }}
              className="bg-[#1C1C1C] text-white py-2 px-4  font-Open text-base font-semibold leading-5"
            />
          </div>
        </div>
      </CenterModal>
    </>
  );
};

export default Index;
