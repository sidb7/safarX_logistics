import React, { useState } from "react";
import feedBackIcon from "../../assets/feedback.svg";
import closeIcon from "../../assets/CloseIcon.svg";
import { Tooltip } from "react-tooltip";
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomDropDown from "../../components/DropDown";
import terriableEmojiIcon from "../../assets/Feedback/terriable.svg";
import badEmojiIcon from "../../assets/Feedback/bad.svg";
import goodEmojiIcon from "../../assets/Feedback/good.svg";
import InputBox from "../../components/Input/index";
import okayEmojiIcon from "../../assets/Feedback/okay.svg";
import ExcellentEmojiIcon from "../../assets/Feedback/excellent.svg";
import terriableActiveIcon from "../../assets/Feedback/terriableColor.svg";
import badActiveIcon from "../../assets/Feedback/badColor.svg";
import okayActiveIcon from "../../assets/Feedback/okayColor.svg";
import goodActiveIcon from "../../assets/Feedback/goodColor.svg";
import excellentActiveIcon from "../../assets/Feedback/excellentColor.svg";
import CustomInputBox from "../../components/Input";
import { module } from "./data";
import { POST } from "../../utils/webService";
import { CREATE_FEEDBACK } from "../../utils/ApiUrls";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const userExperienceExpression = [
  {
    icon: terriableEmojiIcon,
    isActive: false,
    activeIcon: terriableActiveIcon,
    value: "Terriable",
  },
  {
    icon: badEmojiIcon,
    isActive: false,
    activeIcon: badActiveIcon,
    value: "Bad",
  },
  {
    icon: okayEmojiIcon,
    isActive: false,
    activeIcon: okayActiveIcon,
    value: "Okay",
  },
  {
    icon: goodEmojiIcon,
    isActive: false,
    activeIcon: goodActiveIcon,
    value: "good",
  },
  {
    icon: ExcellentEmojiIcon,
    isActive: false,
    activeIcon: excellentActiveIcon,
    value: "Excellent",
  },
];
function AddFeedBack() {
  const [expresstion, setExpression] = useState(userExperienceExpression);
  const [subModuleList, setSubModuleList] = useState([]);
  const [onHoverShowColorEmoji, setOnHoverShowColorEmoji]: any = useState(null);

  const navigate = useNavigate();

  const [feedbackState, setFeedBackState] = useState({
    module: "",
    subModule: "",
    comments: "",
    experience: "",
  });

  const isSubmitDisabled = !Object.values(feedbackState).every(
    (value) => value
  );

  const onChangeHandler = (e?: any, identifier?: any, index?: any) => {
    if (identifier === "experience") {
      let arr = expresstion.map((e: any) => {
        return { ...e, isActive: false };
      });
      arr[index].isActive = true;
      setExpression([...arr]);
      setFeedBackState((prevValue: any) => {
        return { ...prevValue, experience: arr[index].value };
      });
    } else {
      if (e.target.name === "module") {
        const getSelectedModuleObject: any = module.find(
          (data) => data.name === e.target.value
        );
        setSubModuleList(getSelectedModuleObject?.menu);
        setFeedBackState((prevValue: any) => {
          return { ...prevValue, [e.target.name]: e.target.value };
        });
      } else {
        setFeedBackState((prevValue: any) => {
          return { ...prevValue, [e.target.name]: e.target.value };
        });
      }
    }
  };

  const SubmitFeedBack = async () => {
    try {
      const payLoad = {
        ...feedbackState,
      };
      const { data } = await POST(CREATE_FEEDBACK, payLoad);
      if (data.success === true) {
        toast.success(data.message);
        navigate(`/feedback`);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error("Error in API call:", error);
    }
  };

  return (
    <>
      <Breadcrum label="Add Feedback" />
      <div className="flex">
        <div className="w-[100%] max-w-[800px] m-auto">
          <div className=" p-4 h-[100%]">
            <div>
              <div className="flex flex-col items-center">
                <div className="my-5 text-[30px] font-bold">
                  {" "}
                  How Was Your Experience ?
                </div>
                <p className="max-w-[600px] text-center">
                  We greatly appreciate your input, as it assists us in gaining
                  a deeper understanding of your requirements and customizing
                  our service to better suit them.
                </p>
              </div>
            </div>

            <div className="p-3 mt-6">
              <div className="flex items-center justify-between max-w-[500px] m-auto ">
                {expresstion.map((data, index) => {
                  return (
                    <>
                      <div
                        className="w-[60px] h-[60px] rounded-full transform hover:scale-125 shadow-lg hover:shadow-2xl transition duration-300"
                        data-tooltip-id="my-tooltip-inline"
                        data-tooltip-content={data.value}
                        onMouseEnter={() => setOnHoverShowColorEmoji(index)}
                        onMouseLeave={() => setOnHoverShowColorEmoji(null)}
                        onClick={() =>
                          onChangeHandler(null, "experience", index)
                        }
                      >
                        {data.isActive || onHoverShowColorEmoji === index ? (
                          <img src={data.activeIcon} alt="" />
                        ) : (
                          <img src={data.icon} alt="" />
                        )}
                      </div>
                      <Tooltip
                        id="my-tooltip-inline"
                        style={{
                          backgroundColor: "bg-neutral-900",
                          color: "#FFFFFF",
                          width: "fit-content",
                          fontSize: "14px",
                          lineHeight: "16px",
                        }}
                      />
                    </>
                  );
                })}
              </div>
              <div className="my-10 max-w-[550px] m-auto">
                <div>
                  <div className="my-5">
                    <CustomDropDown
                      options={module?.map((option) => ({
                        label: option?.name,
                        value: option?.name,
                      }))}
                      name="module"
                      heading="Select Module"
                      wrapperClass="shadow-inner rounded-lg bg-[#f3f3f3]"
                      onChange={onChangeHandler}
                    />
                  </div>
                  {subModuleList.length > 0 && (
                    <div className="my-5">
                      <CustomDropDown
                        options={subModuleList?.map((option: any) => ({
                          label: option?.name,
                          value: option?.name,
                        }))}
                        name="subModule"
                        heading="Select Sub Module"
                        wrapperClass="shadow-inner rounded-lg bg-[#f3f3f3]"
                        onChange={onChangeHandler}
                      />
                    </div>
                  )}
                  <div className="">
                    <textarea
                      placeholder="Add a Comment"
                      className=" w-[100%] shadow-inner rounded-lg bg-[#f3f3f3] p-4"
                      name="comments"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
                <button
                  className="border py-3 w-[100%] my-10 rounded-lg bg-black disabled:bg-[#d9d7d7] text-white"
                  onClick={SubmitFeedBack}
                  disabled={isSubmitDisabled}
                >
                  Save Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddFeedBack;
