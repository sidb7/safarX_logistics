import React, { useEffect, useState } from "react";
import YaariCashBalance from "./YaariCashBalance";
import CashbackTable from "./CashbackTable";
import UtilizationRules from "./UtilizationRules";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { GET_ALL_COUPONS_DATA } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import toast from "react-hot-toast";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [overallCouponData, setOverallCouponData] = useState<any>();

  const getAllCouponsData = async () => {
    try {
      const { data: response } = await POST(GET_ALL_COUPONS_DATA, {});
      if (response?.success) {
        const couponData = response.data || [];
        const summary = {
          totalCashback: response.totalCashback,
          remainingAmount: response.remainingAmount,
          expiryDate: response.expiryDate,
        };

        // Storing separately in state
        setOverallCouponData({ couponData, summary });
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCouponsData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-6 customScroll">
        <Breadcrum label="YaariCash Dashboard" />

        <div className="space-y-8 px-5 ">
          <YaariCashBalance summary={overallCouponData?.summary} />

          <CashbackTable tablesData={overallCouponData?.couponData} />

          <UtilizationRules summary={overallCouponData?.summary} />
        </div>
      </div>
    </>
  );
};

export default Index;
