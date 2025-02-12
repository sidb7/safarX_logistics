import React, { useEffect, useState } from "react";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomButton from "../../components/Button";
import addIcon from "../../assets/Catalogue/add.svg";
import { useNavigate } from "react-router-dom";
import { tabs } from "./data";
import { GET_FEEDBACK } from "../../utils/ApiUrls";
import { POST } from "../../utils/webService";
import { toast } from "react-hot-toast";
import FeedbackTable from "./feedbackTable";
import { capitalizeFirstLetter } from "../../utils/utility";
import { checkPageAuthorized } from "../../redux/reducers/role";
import AccessDenied from "../../components/AccessDenied";
import OneButton from "../../components/Button/OneButton";

function Feedback() {
  const [feedbackTabs, setFeedBackTabs] = useState(tabs);
  const [renderingComponents, setRenderingComponents] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [feedbackDataList, setFeedbackDataList] = useState([]);
  const [isActive, setIsActive] = useState<any>(false);

  const navigate = useNavigate();

  const getFeedbackList = async (data?: any) => {
    const { data: response } = await POST(GET_FEEDBACK, {
      module:
        feedbackTabs[renderingComponents].value === "ALL"
          ? ""
          : capitalizeFirstLetter(feedbackTabs[renderingComponents].value),
      skip: data?.skip || 0,
      limit: data?.limit || 10,
      pageNo: data?.pageNo || 1,
    });

    if (response?.success) {
      setTotalItemCount(response?.totalCount);
      setFeedbackDataList(response?.data);
    } else {
      setFeedbackDataList([]);
      // toast.error(response?.message);
    }
  };

  const renderHeaderComponent = () => {
    return (
      <>
        <OneButton
          text="Add Feedback"
          onClick={() => navigate(`/feedback/add-feedback`)}
          className=" px-3"
          icon={addIcon}
          showIcon={true}
          variant="primary"
        />
        {/* <CustomButton
          icon={addIcon}
          showIcon={true}
          text={"ADD FEEDBACK"}
          className="!p-3"
          onClick={() => navigate(`/feedback/add-feedback`)}
        /> */}
      </>
    );
  };

  useEffect(() => {
    getFeedbackList();
  }, [renderingComponents]);

  useEffect(() => {
    setIsActive(checkPageAuthorized("Feedback"));
  }, []);
  useEffect(() => {
    window?.dataLayer?.push({
      event: "Click_Feedback",
    });
  }, []);

  return (
    <>
      {isActive ? (
        <div>
          <Breadcrum label="Feedback" component={renderHeaderComponent()} />
          <div className="flex flex-col pt-7 ">
            <div className="mx-5">
              <div className="flex font-medium customScroll whitespace-nowrap mt-2 h-[45px] ">
                {feedbackTabs?.map(({ statusName }: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ borderBottomWidth: "3px" }}
                      className={`flex justify-center items-center border-[#777777] px-6  cursor-pointer ${
                        renderingComponents === index ? "!border-[#004EFF]" : ""
                      }`}
                      onClick={() => setRenderingComponents(index)}
                    >
                      <span
                        className={`text-[#777777] text-[15px] lg:text-[18px] ${
                          renderingComponents === index
                            ? "!text-[#004EFF] lg:text-[18px]"
                            : ""
                        }`}
                      >
                        {statusName}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2">
                <div className="customScroll">
                  <FeedbackTable
                    feedbackDataList={feedbackDataList}
                    getFeedbackList={getFeedbackList}
                    totalItemCount={totalItemCount}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}

export default Feedback;
