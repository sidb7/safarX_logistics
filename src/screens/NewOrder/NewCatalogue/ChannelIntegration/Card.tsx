import DeleteIcon from "../../../../assets/DeleteIconRedColor.svg";
import {
  calculateDaysAgoFromToday,
  capitalizeFirstLetter,
} from "../../../../utils/utility";
import OrangeAlertIcon from "../../../../assets/info-circle-outline.svg";
import OneButton from "../../../../components/Button/OneButton";

const Card = (props: any) => {
  const {
    channel,
    key,
    setModalData,
    setIndexNum,
    index,
    setIntegrate,

    setDeleteModal,

    setDeleteChannel,
  } = props;

  const handleIntegration = (e: any) => {
    if (setModalData) {
      if (e.target.textContent === "Integrate" || channel.expiredToken)
        setModalData({ isOpen: true, modalData: channel });
    }
    if (setIndexNum) setIndexNum(index);
    setIntegrate(false);
  };

  return (
    <div
      className={`border-[1px] ${
        channel.expiredToken ? "border-[#F35939]" : "border-[#A4A4A4]"
      } rounded relative z-1  mt-5`}
      key={key}
    >
      <div className={`py-[14px] px-[16px] w-[200px] `}>
        <div className="flex w-[100%] items-center lg:flex-col lg:items-start lg:gap-y-2 gap-x-6 mb-[1rem] lg:w-[170px] min-h-[45px]  ">
          <div className="flex items-center w-[100%] justify-between">
            <div>
              <img
                src={channel.icon}
                alt=""
                className={`lg:hidden ${
                  channel.icon.includes("ZOHO") ? "w-[100px]" : ""
                }`}
              />
              <img
                style={{ height: "45px", width: "115px" }}
                src={channel.iconLg}
                alt=""
                className="hidden h-max  lg:block"
              />
            </div>
            <div className="flex gap-x-1">
              <div>
                {channel.integrated && channel.expiredToken && (
                  <div className="">
                    <img
                      alt=""
                      src={OrangeAlertIcon}
                      className="cursor-pointer w-5"
                      onClick={(e: any) => {
                        handleIntegration(e);
                      }}
                    />
                  </div>
                )}
              </div>
              <div>
                {channel.integrated && (
                  <div className="">
                    <img
                      alt=""
                      src={DeleteIcon}
                      className="cursor-pointer w-5"
                      onClick={() => {
                        setDeleteModal(true);
                        setDeleteChannel(channel);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {channel.integrated && (
            <p className="font-semibold text-[16px] w-[150px] ml-1 text-[#323232] line-clamp-1 ">
              {capitalizeFirstLetter(channel.name)}
            </p>
          )}
        </div>
        {/* <div
          onClick={(e: any) => !channel?.expiredToken && handleIntegration(e)}
          className={` ${
            channel.integrated ? " bg-black  " : "hover:bg-black cursor-pointer"
          } group border-[1px] rounded py-2 px-4 border-[#A4A4A4] w-[118px]   `}
        >
          <p
            className={` ${
              channel.integrated ? "text-white" : "group-hover:text-white"
            } font-semibold text-[14px] text-[#1C1C1C] uppercase  `}
          >
            {channel.integrated ? "Integrated" : "Integrate"}
          </p>
        </div> */}
        <div className="w-[70%]">
          <OneButton
            text={channel.integrated ? "Integrated" : "Integrate"}
            onClick={(e) => !channel?.expiredToken && handleIntegration(e)}
            className={` ${channel.integrated ? "bg-black" : ""}`}
            variant={channel.integrated ? "primary" : "secondary"}
            disabled={channel?.expiredToken}
            textTransform="uppercase"
          />
        </div>
      </div>

      {channel.integrated && (
        <p
          className={` ${
            channel.expiredToken ? "bg-[#F35939]" : "bg-[#4D83FF]"
          } absolute -top-3 left-5  z-2 bg-[#4D83FF] flex items-center px-3 py-1 h-[24px] font-semibold text-[12px] rounded text-white`}
        >
          {`${
            channel.expiredToken
              ? "Token Expired!!"
              : channel.integrated
              ? calculateDaysAgoFromToday(channel.createdAt).toString() == "0"
                ? "Integrated Today"
                : `${calculateDaysAgoFromToday(
                    channel.createdAt
                  ).toString()} Days Ago`
              : ""
          } `}
        </p>
      )}
    </div>
  );
};

export default Card;
