import React, { useState } from 'react'
import feedBackIcon from "../../assets/feedback.svg"
import closeIcon from "../../assets/CloseIcon.svg"
import { Tooltip } from 'react-tooltip'
import { Breadcrum } from "../../components/Layout/breadcrum";
import CustomDropDown from "../../components/DropDown";
import terriableEmojiIcon from "../../assets/Feedback/terriable.svg";
import badEmojiIcon from "../../assets/Feedback/bad.svg";
import goodEmojiIcon from "../../assets/Feedback/good.svg"
import okayEmojiIcon from "../../assets/Feedback/okay.svg"
import ExcellentEmojiIcon from "../../assets/Feedback/excellent.svg"
import terriableActiveIcon from "../../assets/Feedback/terriableColor.svg"
import badActiveIcon from "../../assets/Feedback/badColor.svg"
import okayActiveIcon from "../../assets/Feedback/okayColor.svg"
import goodActiveIcon from "../../assets/Feedback/goodColor.svg"
import excellentActiveIcon from "../../assets/Feedback/excellentColor.svg"
import CustomInputBox from '../../components/Input';

const userExperienceExpression = [
    {
        icon: terriableEmojiIcon,
        isActive: false,
        activeIcon: terriableActiveIcon,
        value: "Terriable"
    },
    {
        icon: badEmojiIcon,
        isActive: false,
        activeIcon: badActiveIcon,
        value: "Bad"
    },
    {
        icon: okayEmojiIcon,
        isActive: false,
        activeIcon: okayActiveIcon,
        value: "Okay"
    },
    {
        icon: goodEmojiIcon,
        isActive: false,
        activeIcon: goodActiveIcon,
        value: "good"
    },
    {
        icon: ExcellentEmojiIcon,
        isActive: false,
        activeIcon: excellentActiveIcon,
        value: "Excellent"
    }
]
function FeedBack() {
    const [expresstion, setExpression] = useState(userExperienceExpression)
    const [selectedExpression, setSelectedExpression] = useState({})



    const selectExperience = (index: any) => {
        let arr = expresstion.map((e: any) => { return { ...e, isActive: false } })
        arr[index].isActive = true
        setExpression([...arr])
        setSelectedExpression(arr[index])
    }

    console.log("selectedExpression", selectedExpression)


    return (
        <>
            <Breadcrum label="Feedback" />
            <div className='flex'>
                <div className='w-[100%] max-w-[800px] m-auto'>
                    <div className=' p-8 h-[100%]'>
                        <div className='border-b flex justify-between items-center py-4'>
                            <div className='flex items-center justify-center'>
                                <img src={feedBackIcon} alt='' className='w-[25px] h-[25px] mr-3' />
                                <div className='text-[23px]'>Feedback</div>
                            </div>
                        </div>

                        <div>
                            <div className='flex flex-col items-center'>
                                <div className='my-5 text-[30px] font-bold'>  How Was Your Experience ?</div>
                                <p className='max-w-[600px] text-center'>We greatly appreciate your input, as it assists us in gaining a deeper understanding of your requirements and customizing our service to better suit them.</p>
                            </div>
                        </div>

                        <div className='p-3 my-6'>
                            <div className='flex items-center justify-between max-w-[500px] m-auto '>
                                {
                                    expresstion.map((data, index) => {
                                        return (
                                            <>
                                                <div
                                                    className='w-[60px] h-[60px] rounded-full transform hover:scale-125 shadow-lg hover:shadow-2xl transition duration-300'
                                                    data-tooltip-id="my-tooltip-inline"
                                                    data-tooltip-content={data.value}
                                                    onClick={() => selectExperience(index)}
                                                >
                                                    {
                                                        data.isActive ? (<img src={data.activeIcon} alt='' />) : (<img src={data.icon} alt='' />)
                                                    }



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
                                        )
                                    })
                                }

                            </div>
                            <div className='my-10 max-w-[550px] m-auto'>
                                <div>
                                    <div className='my-5'>
                                        <CustomDropDown placeHolder='Select Module' wrapperClass='shadow-inner rounded-lg bg-[#f3f3f3]' onChange={() => console.log("")} />
                                    </div>
                                    <div className=''>
                                        <CustomInputBox placeholder='Add a Comment' className='w-[100%] shadow-inner rounded-lg bg-[#f3f3f3] p-4' />
                                    </div>

                                </div>
                                <button className='border py-3 w-[100%] my-10 rounded-lg bg-black text-white'>Save Feedback</button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedBack
