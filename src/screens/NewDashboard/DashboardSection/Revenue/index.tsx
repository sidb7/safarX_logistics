import React, { useState } from "react";
import { Spinner } from "../../../../components/Spinner";
import TotalRevenueCount from "./TotalRevenueCount";
import CodAndPayments from "./CodAndPayments";
import WeightDiscrepancy from "./WeightDiscrepancy";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <>
      <div className="!h-[calc(100vh-75px)] mt-5">
        {isLoading ? (
          <div className="flex justify-center w-[100%] h-[40vh] items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-y-10">
              <TotalRevenueCount />
              <CodAndPayments />
              <WeightDiscrepancy />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Index;
