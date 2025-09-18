import React, { useEffect, useState } from "react";
import YaariCashBalance from "./YaariCashBalance";
import CashbackTable from "./CashbackTable";
import UtilizationRules from "./UtilizationRules";
import { Breadcrum } from "../../components/Layout/breadcrum";
import { GET_ALL_COUPONS_DATA, COMPANY_NAME } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import toast from "react-hot-toast";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const [overallCouponData, setOverallCouponData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const companyName = COMPANY_NAME;

  const getAllCouponsData = async () => {
    try {
      setLoading(true);
      const { data: response } = await POST(GET_ALL_COUPONS_DATA, {});
      if (response?.success) {
        const couponData = response?.data || [];
        const summary = {
          totalCashback: response?.totalCashback || 0,
          remainingAmount: response?.remainingAmount || 0,
          expiryDate: response?.expiryDate || 0,
          latestUtilizationRule: response?.latestUtilizationRule || 0,
        };

        // Storing separately in state
        setOverallCouponData({ couponData, summary });
        setLoading(false);
      } else {
        toast.error(response?.message);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCouponsData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-6 customScroll">
        <Breadcrum
          label={`${companyName === "Drivaa.Run" ? "YaariCash" : "Cashback"}`}
        />

        <div className="space-y-8 px-5 ">
          <YaariCashBalance
            summary={overallCouponData?.summary}
            loadingState={loading}
            companyName={companyName}
          />

          <CashbackTable
            tablesData={overallCouponData?.couponData}
            loadingState={loading}
            companyName={companyName}
          />

          <UtilizationRules
            summary={overallCouponData?.summary}
            loadingState={loading}
            companyName={companyName}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
