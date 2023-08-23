import { Breadcum } from "../../../components/Layout/breadcum";
import BottomLayout from "../../../components/Layout/bottomLayout";
import { useState } from "react";
import ChannelIntegration from "./ChannelIntegration/ChannelIntegration";

const Catalogue = () => {
  const [tabName, setTabName] = useState([
    {
      statusName: "Channel Integration",
      active: true,
    },
    {
      statusName: "Address Book",
      active: false,
    },
    {
      statusName: "Product Catalogue",
      active: false,
    },
    {
      statusName: "Box Catalogue",
      active: false,
    },
  ]);

  const renderComponent = () => {
    const activeTabName = tabName.find((singleTab) => {
      return singleTab.active === true;
    });
    if (activeTabName?.statusName === "Channel Integration") {
      return <ChannelIntegration />;
    } else if (activeTabName?.statusName === "Address Book") {
      return <div>Address Book</div>;
    }
  };

  return (
    <div className="overflow-y-auto h-[calc(100%-50px)]">
      <Breadcum label="Catalogue" />
      <div className="mt-4 mx-4">
        <div className="flex flex-row gap-x-2 ml-5 overflow-x-scroll whitespace-nowrap mt-2 lg:h-[34px]">
          {tabName.map(({ statusName }, index) => {
            return (
              <div
                className={`flex lg:justify-center items-center border-b-2 cursor-pointer border-[#777777] px-4 
                  ${
                    ""
                    // catalogueState?.channelName === statusName
                    //   && "!border-[#004EFF]"
                  }
                  `}
                // onClick={() => {
                //   tabName.forEach((singleTab, index) => {
                //     if(){

                //     }
                //   })
                // }}
                key={index}
              >
                <span
                  className={`text-[#777777] text-[14px] lg:text-[18px] 
                    ${
                      ""
                      // catalogueState?.channelName === statusName
                      //   && "!text-[#004EFF] lg:text-[18px]"
                    }
                    `}
                >
                  {statusName}
                </span>
              </div>
            );
          })}
        </div>

        {renderComponent()}
      </div>
      <BottomLayout callApi={() => {}} />
    </div>
  );
};

export default Catalogue;
