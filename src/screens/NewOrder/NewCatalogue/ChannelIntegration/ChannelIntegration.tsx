import Card from "./Card";
import {
  ChannelIntegrationCarts,
  ChannelIntegrationInventory,
  ChannelIntegrationMarketPlace,
  ChannelIntegrationWarehouse,
} from "../../../../utils/dummyData";
import Header from "./Header";

const ChannelIntegration = () => {
  return (
    <div className="">
      <div className="mt-6">
        <Header title={ChannelIntegrationCarts.title} />
        <div className="flex gap-x-4 overflow-x-auto ">
          {ChannelIntegrationCarts.channels.map((eachChannel, index) => {
            return <Card channel={eachChannel} key={index} />;
          })}
        </div>
      </div>
      <div className="mt-4">
        <Header title={ChannelIntegrationMarketPlace.title} />
        <div className="flex gap-x-4 overflow-x-auto ">
          {ChannelIntegrationMarketPlace.channels.map((eachChannel, index) => {
            return <Card channel={eachChannel} key={index} />;
          })}
        </div>
      </div>
      <div className="mt-4">
        <Header title={ChannelIntegrationWarehouse.title} />
        <div className="flex gap-x-4 overflow-x-auto ">
          {ChannelIntegrationWarehouse.channels.map((eachChannel, index) => {
            return <Card channel={eachChannel} key={index} />;
          })}
        </div>
      </div>
      <div className="mt-4">
        <Header title={ChannelIntegrationInventory.title} />
        <div className="flex gap-x-4 overflow-x-auto ">
          {ChannelIntegrationInventory.channels.map((eachChannel, index) => {
            return <Card channel={eachChannel} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ChannelIntegration;
