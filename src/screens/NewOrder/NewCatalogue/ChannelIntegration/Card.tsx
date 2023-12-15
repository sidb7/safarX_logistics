const Card = (props: any) => {
  const { channel, key, setModalData, setIndexNum, index, setIntegrate } =
    props;

  const handleIntegration = (e: any) => {
    if (setModalData) {
      if (e.target.textContent === "Integrate")
        setModalData({ isOpen: true, modalData: channel });
    }
    if (setIndexNum) setIndexNum(index);
    setIntegrate(false);
  };

  return (
    <div
      className="border-[1px] border-[#A4A4A4] rounded relative z-1  mt-5"
      key={key}
    >
      <div className={`py-[14px] px-[16px] w-[200px] `}>
        <div className="flex w-[100%] items-center lg:flex-col lg:items-start lg:gap-y-5 gap-x-6 mb-[1rem] lg:w-[118px] min-h-[45px]  ">
          <img
            src={channel.icon}
            alt=""
            className={`lg:hidden ${
              channel.icon.includes("ZOHO") ? "w-[100px]" : ""
            }`}
          />
          <img src={channel.iconLg} alt="" className="hidden h-max lg:block" />

          {channel.integrated && (
            <p className="font-semibold text-[16px] ml-1 text-[#323232] line-clamp-1 ">
              {channel.name}
            </p>
          )}
        </div>
        <div
          onClick={handleIntegration}
          className={` ${
            channel.integrated ? " bg-black " : "hover:bg-black"
          } group border-[1px] rounded py-2 px-4 border-[#A4A4A4] w-[118px] cursor-pointer  `}
        >
          <p
            className={` ${
              channel.integrated ? "text-white" : "group-hover:text-white"
            } font-semibold text-[14px] text-[#1C1C1C] uppercase  `}
          >
            {channel.integrated ? "Integrated" : "Integrate"}
          </p>
        </div>
      </div>

      {channel.integrated && (
        <p className="absolute -top-3 left-5  z-2 bg-[#4D83FF] flex items-center px-3 py-1 h-[24px] font-semibold text-[12px] rounded text-white">
          {`${
            channel.storesIntegrated ? channel.storesIntegrated : 1
          }  Active Stores`}
        </p>
      )}
    </div>
  );
};

export default Card;
