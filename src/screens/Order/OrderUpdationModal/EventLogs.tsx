import React, { useState, useEffect } from "react";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";

const EventLogs = (completeData: any) => {
    const [accordianOpen, setOpenAccordian] = useState<any>(false);
    const [eventLogs, setEventLogs] = useState<any>([]);

    useEffect(() => {
        setEventLogs(completeData?.completeData?.status);
    }, [completeData]);
    return (
        <div className="m-4">
            <div
                className="flex justify-between border p-4 rounded-lg  border-[#E8E8E8]"
                onClick={() => setOpenAccordian(!accordianOpen)}
            >
                <p className="text-base">Event Logs</p>
                {accordianOpen ? (
                    <img src={UpwardArrow} alt="icon" />
                ) : (
                    <img src={DownwardArrow} alt="icon" />
                )}
            </div>
            {accordianOpen &&
                (eventLogs?.length !== 0 ? (
                    <div className="mb-4 border-l border-r border-b rounded-lg border-[#E8E8E8] px-4 py-4 ">
                        <div>
                            {eventLogs?.map((event: any) => {
                                return (
                                    <div className="flex flex-col gap-y-4 py-4 my-4 border border-black-200 px-4 rounded-lg bg-gray-50">
                                        <div className="flex justify-between">
                                            <p className="text-base font-semibold">
                                                AWB:
                                            </p>
                                            <p className="text-[18px]">
                                                {event?.awb === "" ||
                                                event?.awb === null
                                                    ? "-"
                                                    : event?.awb}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-base">
                                                Current Status
                                            </p>
                                            <p className="text-base">
                                                {event?.currentStatus === ""
                                                    ? "-"
                                                    : event?.currentStatus}
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-base">
                                                Description
                                            </p>
                                            <p className="text-base">
                                                {event?.description === ""
                                                    ? "-"
                                                    : event?.description}
                                            </p>
                                        </div>
                                        <div className="flex justify-between gap-x-14">
                                            <p className="text-base">Login</p>
                                            <p className="whitespace-nowrap overflow-x-scroll customScroll">
                                                {event?.logId === ""
                                                    ? "-"
                                                    : event?.logId}
                                            </p>
                                        </div>
                                        <div className="flex justify-between gap-x-14">
                                            <p className="text-base">Notes</p>
                                            <p className="whitespace-nowrap overflow-x-scroll customScroll">
                                                {event?.notes === ""
                                                    ? "-"
                                                    : event?.notes}
                                            </p>
                                        </div>
                                        <div className="flex justify-between gap-x-10">
                                            <p className="text-base">
                                                Time Stamp
                                            </p>
                                            <p className="text-base">
                                                {event?.timeStamp === ""
                                                    ? "-"
                                                    : event?.timeStamp}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    "No Data Found"
                ))}
        </div>
    );
};

export default EventLogs;
