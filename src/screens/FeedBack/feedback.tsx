import React, { useEffect, useState } from 'react'
import { Breadcrum } from '../../components/Layout/breadcrum'
import CustomButton from "../../components/Button";
import addIcon from "../../assets/Catalogue/add.svg";
import { useNavigate } from 'react-router-dom';
import { tabs } from "./data"
import { GET_FEEDBACK } from '../../utils/ApiUrls';
import { POST } from '../../utils/webService';
import { toast } from 'react-toastify';
import FeedbackTable from './feedbackTable';
import { capitalizeFirstLetter } from '../../utils/utility';

function Feedback() {

    const [feedbackTabs, setFeedBackTabs] = useState(tabs)
    const [renderingComponents, setRenderingComponents] = useState(0);
    const [totalItemCount, setTotalItemCount] = useState(0)
    const [feedbackDataList, setFeedbackDataList] = useState([])

    const navigate = useNavigate()


    const getFeedbackList = async (data?: any) => {

        const { data: response } = await POST(GET_FEEDBACK, {
            module:
                feedbackTabs[renderingComponents].value === "ALL"
                    ? ""
                    : capitalizeFirstLetter(feedbackTabs[renderingComponents].value),
            skip: (data?.currentPage - 1) * data?.itemsPerPage || 0,
            limit: data?.itemsPerPage || 10,
            pageNo: data?.currentPage || 1,
        });

        if (response?.success) {
            setTotalItemCount(response.totalFeedback);
            setFeedbackDataList(response?.data);
        } else {
            setFeedbackDataList([]);
            toast.error(response?.message);
        }
    };

    const renderHeaderComponent = () => {
        return (
            <CustomButton
                icon={addIcon}
                showIcon={true}
                text={"ADD FEEDBACK"}
                className="!p-3"
                onClick={() => navigate(`/feedback/add-feedback`)}
            />
        )
    }

    useEffect(() => {
        getFeedbackList()
    }, [renderingComponents])


    return (
        <>
            <div>
                <Breadcrum label="Feedback" component={renderHeaderComponent()} />
            </div>

            <div className="flex flex-col pt-7 ">
                <div className='mx-5'>
                    <div className="flex font-medium overflow-x-scroll whitespace-nowrap mt-2 h-[34px] ">
                        {feedbackTabs?.map(({ statusName }: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    style={{ borderBottomWidth: "3px" }}
                                    className={`flex justify-center items-center border-[#777777] px-6  cursor-pointer ${renderingComponents === index ? "!border-[#004EFF]" : ""
                                        }`}
                                    onClick={() => setRenderingComponents(index)}
                                >
                                    <span
                                        className={`text-[#777777] text-[15px] lg:text-[18px] ${renderingComponents === index ? "!text-[#004EFF] lg:text-[18px]" : ""
                                            }`}
                                    >
                                        {statusName}
                                    </span>

                                </div>
                            );
                        })}
                    </div>
                    <div className='mt-2'>
                        <FeedbackTable feedbackDataList={feedbackDataList} getFeedbackList={getFeedbackList} totalItemCount={totalItemCount} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feedback
