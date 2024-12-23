import React, { useState } from "react";
import { Spinner } from "../../../../components/Spinner";
import CountAndType from "./CountAndType";
import LocationWise from "./LocationWise";
import CategoriesAndChannels from "./CategoriesAndChannels";

interface IIndexProps {
  isStateSelected: boolean;
  setIsStateSelected: any;
}

const Index: React.FunctionComponent<IIndexProps> = ({
  isStateSelected,
  setIsStateSelected,
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  return (
    // <div className="!h-[calc(100vh-75px)] mt-5">
    //   {isLoading ? (
    //     <div className="flex justify-center w-[100%] h-[40vh] items-center">
    //       <Spinner />
    //     </div>
    //   ) : (

    //   )}

    // </div>
    <>
      <div className="flex flex-col gap-y-10">
        <CountAndType />
        <LocationWise
          isStateSelected={isStateSelected}
          setIsStateSelected={setIsStateSelected}
        />
        <CategoriesAndChannels />
      </div>
    </>
  );
};

export default Index;
