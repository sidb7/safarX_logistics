import React, { useState, useEffect } from "react";
import { Breadcrum } from "../../../../components/Layout/breadcrum";
import centerIcon from "../../../../assets/LostAndDamged/Group 1000006836 (1).svg";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import CustomInputBox from "../../../../components/Input";
import OneRadioButton from "../../../../components/OneRadioButton/OneRadioButton";
import { FETCH_LD_ORDERS, UPDATE_LD_ORDERS } from "../../../../utils/ApiUrls";
import { POST } from "../../../../utils/webService";
import toast from "react-hot-toast";
import LostAndFoundTable from "./LostAndFoundTable";
import OneButton from "../../../../components/Button/OneButton";

// interface OrderDetails {
//   packageInfo: string;
//   weight: string;
//   invoiceValue: string;
//   insurance: string;
//   bookedDate: string;
// }

const LostAndDamaged: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [awbNo, setAwbNo] = useState("");
  const [remark, setRemark] = useState("");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [orderDetailsTable, setOrderDetailsTable] = useState<any>(null);

  const [selectedOption, setSelectedOption] = useState("LOST");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const fetchOrderDetails = async (awb?: string) => {
    try {
      const payload = {
        searchValue: awb,
      };

      const response = await POST(FETCH_LD_ORDERS, payload);
      if (response?.data?.success) {
        setOrderDetails(response.data.data?.[0]?.data);
      }
    } catch (error) {
      setOrderDetails(null);

      console.error("Error fetching order details:", error);
    }
  };

  const fetchOrderDetailsTable = async (awb?: string) => {
    try {
      const payload = {
        searchValue: awb,
      };

      const response = await POST(FETCH_LD_ORDERS, payload);
      if (response?.data?.success) {
        setOrderDetailsTable(response.data.data?.[0]?.data);
      }
    } catch (error) {
      setOrderDetails(null);

      console.error("Error fetching order details:", error);
    }
  };

  const handleAwbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const awbValue = e.target.value;
    setAwbNo(awbValue);
    if (awbValue?.length >= 8) {
      fetchOrderDetails(awbValue);
    }
  };

  // const handleSubmit = async () => {
  //   if (isSubmitting) return;

  //   // Validation
  //   if (!awbNo) {
  //     toast.error("Please enter AWB number");
  //     return;
  //   }
  //   if (!remark) {
  //     toast.error("Please enter a remark");
  //     return;
  //   }

  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData();

  //     // Add the request data as a JSON string
  //     const requestData = {
  //       awb: awbNo,
  //       ldStatus: selectedOption,
  //       remark: remark
  //     };
  //     formData.append('request', JSON.stringify(requestData));

  //     // If you need to handle file uploads, you can add them like this:
  //     // if (files) {
  //     //   files.forEach(file => {
  //     //     formData.append('files', file);
  //     //   });
  //     // }

  //     const response = await POST(UPDATE_LD_ORDERS, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     });

  //     if (response?.data?.success) {
  //       toast.success("Successfully updated!");
  //       handleModalClose();
  //     } else {
  //       toast.error(response?.data?.message || "Failed to update order");
  //     }
  //   } catch (error) {
  //     console.error("Error updating order:", error);
  //     toast.error("An error occurred while updating the order");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Validation
    if (!awbNo) {
      toast.error("Please enter AWB number");
      return;
    }
    if (!remark) {
      toast.error("Please enter a remark");
      return;
    }
    if (selectedOption === "DAMAGE" && imageFiles?.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const requestData = {
        awb: awbNo,
        ldStatus: selectedOption,
        remark: remark,
      };
      formData.append("request", JSON.stringify(requestData));

      if (selectedOption === "DAMAGE") {
        imageFiles.forEach((file, index) => {
          formData.append(`image${index + 1}`, file);
        });
        if (videoFile) formData.append("video", videoFile);
      }

      const response = await POST(UPDATE_LD_ORDERS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        toast.success("Successfully updated!");
        handleModalClose();
      } else {
        toast.error(response?.data?.message || "Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("An error occurred while updating the order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalFiles = [...imageFiles, ...newFiles];

      if (totalFiles?.length > 3) {
        toast.error("You can only upload up to 3 images");
        return;
      }

      setImageFiles(totalFiles);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImageFiles(imageFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setAwbNo("");
    setRemark("");
    setOrderDetails(null);
    setSelectedOption("LOST");
    setImageFiles([]);
    setVideoFile(null);
  };

  console.log(
    "Order details ",
    // orderDetails?.codInfo?.isCod
    //   ? orderDetails?.codInfo?.collectableAmount
    //   : orderDetails?.codInfo?.invoiceValue
    orderDetails
  );

  useEffect(() => {
    fetchOrderDetailsTable();
  }, []);

  return (
    <div>
      <Breadcrum label="Lost and Damaged" />
      {orderDetailsTable?.length != 0 &&(<div className="flex flex-col items-end justify-end pr-4">

        <OneButton
          text="ADD SHIPMENT"
          onClick={handleClick}
          className="max-w-[200px]"
          variant="primary"
        />
      </div>)}

      {orderDetailsTable?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
          <img src={centerIcon} alt="Lost and Damaged Icon" className="mb-4" />

          <p className="font-Open text-[28px] leading-[36px] tracking-[0%] text-center font-normal">
            Missing Or Damaged Shipment?
            <br />
            <span
              className="text-blue-500 cursor-pointer hover:underline font-Lato text-[28px] leading-[36px] tracking-[0%] text-center font-semibold"
              onClick={handleClick}
            >
              Click Here
            </span>{" "}
            To Report.
          </p>
        </div>
      ) : (
        <LostAndFoundTable orders={orderDetailsTable} />
      )}

      <CenterModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className="!h-[calc(100vh-50px)] w-[500px]"
      >
        {/* <div className="flex justify-between items-center p-6  w-full">
            <h2 className="text-xl font-medium">Lost And Damage</h2>
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="w-full p-6"> */}
        {/* Sticky Header */}
        <div className="flex justify-between items-center p-4 mb-2 border-b bg-white w-full">
          <h2 className="text-xl font-medium relative">Lost And Damage</h2>
          <button
            onClick={handleModalClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="h-full w-full p-6 flex flex-col">
          <div className="w-full mb-6">
            <p className="text-sm mb-3">Select</p>
            <div className="flex gap-x-3">
              <div className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  name="option"
                  value="LOST"
                  onChange={handleOptionChange}
                  checked={selectedOption === "LOST"}
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span
                  className="font-Open text-sm font-semibold leading-5"
                  onClick={() => setSelectedOption("LOST")}
                >
                  LOST
                </span>
              </div>
              <div className="flex gap-x-2 items-center">
                <input
                  type="radio"
                  name="option"
                  value="DAMAGE"
                  onChange={handleOptionChange}
                  checked={selectedOption === "DAMAGE"}
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                />
                <span
                  className="font-Open text-sm font-semibold leading-5"
                  onClick={() => setSelectedOption("DAMAGE")}
                >
                  DAMAGED
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <CustomInputBox
              label="Enter AWB No."
              value={awbNo}
              onChange={handleAwbChange}
              className="mb-4"
            />

            {/* {orderDetails && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="font-medium mb-3">
                    Package Info:{" "}
                    {
                      orderDetails?.orderInfo.boxInfo?.[0]?.products?.[0]
                        ?.name
                    }
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-2">
                        Weight:{" "}
                        {
                          orderDetails?.trackingInfo?.service
                            ?.appliedWeight
                        }
                      </p>
                      <p className="text-sm">
                        Insurance:{" "}
                        {orderDetails?.trackingInfo.service.insurance === 0
                          ? "No"
                          : "Yes"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm mb-2">
                        Invoice Value:{" "}
                        {orderDetails?.trackingInfo.codInfo.isCod
                          ? orderDetails?.trackingInfo.codInfo
                              .collectableAmount
                          : orderDetails?.trackingInfo.codInfo
                              .invoiceValue}
                      </p>
                      <p className="text-sm">
                        Booked Date: {new Date(orderDetails?.trackingInfo.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )} */}
            {orderDetails && (
              <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-sm">
                <div className="border-b pb-4 mb-4">
                  <h3 className="font-semibold text-lg mb-2">
                    Package Details
                  </h3>
                  <p className="text-gray-700">
                    {orderDetails?.orderInfo?.boxInfo?.[0]?.products?.[0]
                      ?.name || "Package info not available"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Weight</p>
                      <p className="font-medium">
                        {orderDetails?.trackingInfo?.service?.appliedWeight
                          ? `${orderDetails?.[0]?.trackingInfo?.service.appliedWeight} kg`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Insurance Status
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          orderDetails?.trackingInfo?.service.insurance === 0
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {orderDetails?.trackingInfo?.service.insurance === 0
                          ? "Not Insured"
                          : "Insured"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Invoice Value
                      </p>
                      <p className="font-medium">
                        ₹{" "}
                        {orderDetails?.trackingInfo?.codInfo?.isCod
                          ? orderDetails?.[0]?.trackingInfo?.codInfo?.collectableAmount?.toLocaleString(
                              "en-IN"
                            )
                          : orderDetails?.[0]?.trackingInfo?.codInfo?.invoiceValue?.toLocaleString(
                              "en-IN"
                            ) || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Booking Date</p>
                      <p className="font-medium">
                        {orderDetails?.trackingInfo?.createdAt
                          ? new Date(
                              orderDetails?.[0]?.trackingInfo?.createdAt
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <CustomInputBox
              label="Remark"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="mb-6"
            />

            {/* {selectedOption === "DAMAGE" && (
                <div className="space-y-4 mt-4 mb-4">
                  <div>
                    <p className="text-sm mb-2">
                      Upload Images (Up to 3 files)
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    {imageFiles.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {imageFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                          >
                            <span className="text-sm">{file.name}</span>
                            <button
                              onClick={() => removeImage(index)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                              type="button"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm mb-2">Upload Video (Optional)</p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    {videoFile && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                          <span className="text-sm">{videoFile.name}</span>
                          <button
                            onClick={() => setVideoFile(null)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            type="button"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )} */}

            {selectedOption === "DAMAGE" && (
              <div className="space-y-4 mt-4 mb-4">
                <div>
                  {/* <p className="text-sm mb-2">
                      Upload Images 
                    </p> */}
                  <div className="relative w-full h-12 border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      required
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-gray-500 text-[12px]   leading-4 font-Open">
                        Upload Image (Up to 3 files)
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M12 16V8M8 12l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {imageFiles?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {imageFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-gray-100 rounded-full px-3 py-1"
                        >
                          <span className="text-sm">{file.name}</span>
                          <button
                            onClick={() => removeImage(index)}
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            type="button"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  {/* <p className="text-sm mb-2">Upload Video </p> */}
                  <div className="relative w-full h-12 border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <span className="text-gray-500 text-[12px]   leading-4 font-Open">
                        Upload Video (Optional)
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-blue-600"
                      >
                        <path
                          d="M12 16V8M8 12l4-4 4 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  {videoFile && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                        <span className="text-sm">{videoFile.name}</span>
                        <button
                          onClick={() => setVideoFile(null)}
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <button
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 text-sm font-medium disabled:bg-gray-400"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </div>
        </div>
      </CenterModal>
    </div>
  );
};

export default LostAndDamaged;
