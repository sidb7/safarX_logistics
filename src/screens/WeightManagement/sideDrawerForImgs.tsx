import React, { useState } from "react";
import Checkbox from "../../components/CheckBox";
import gallaryIcon from "../../assets/galleryIcon.svg";
import CrossIcon from "../../assets/cross.svg";
import { DELETE_DISPUTE_IMAGES } from "../../utils/ApiUrls";
import toast from "react-hot-toast";
import { POST } from "../../utils/webService";
import { Spinner } from "../../components/Spinner";

function SideDrawerForImgs({
  data,
  setSideDrawer,
  imagesList,
  getWeightDispute,
  getImageLoading,
}: any) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  //delete images onchange func
  const handleCheckboxChange = (imageUrl: string) => {
    if (selectedImages.includes(imageUrl)) {
      setSelectedImages(selectedImages.filter((url) => url !== imageUrl));
    } else {
      setSelectedImages([...selectedImages, imageUrl]);
    }
  };

  const handleImageDelete = async () => {
    try {
      setIsLoading(true);
      const payload: any = {
        awbNo: data?.awb,
        privateCompanyId: data?.privateCompanyId,
        imagesIdArray: selectedImages,
      };

      const res = await POST(DELETE_DISPUTE_IMAGES, payload);

      if (res?.data?.success) {
        setSideDrawer({
          isOpen: false,
          data: {},
        });
        setSelectedImages([]);
        setIsLoading(false);
        getWeightDispute();
      } else {
        toast.error(res?.data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      return error;
    }
  };

  return (
    <>
      <div className="p-5 h-[96%]">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src={gallaryIcon} height={30} width={30} alt="" />
            <p className="text-[24px]">Image Details</p>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setSideDrawer({ isOpen: false, data: {} })}
          >
            <img src={CrossIcon} height={30} width={30} alt="" />
          </div>
        </div>
        {/* image listing */}

        {!getImageLoading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 py-5 mx-1 my-4 h-[700px] overflow-auto">
            {imagesList?.map((imageUrl: any, index: number) => {
              return (
                <div key={index} className="flex-1">
                  <div
                    className="flex gap-x-4 cursor-pointer"
                    onClick={() => handleCheckboxChange(imageUrl?.imageId)}
                  >
                    {data?.name === "seller" && (
                      <div>
                        <input
                          type="checkbox"
                          checked={selectedImages.includes(imageUrl?.imageId)}
                          className="cursor-pointer !h-4 !w-4 !rounded-lg"
                          // onChange={() => handleCheckboxChange(imageUrl?.imageId)}
                        />
                      </div>
                    )}
                    <div className="">
                      <img
                        className="rounded-lg"
                        src={imageUrl?.openUrl}
                        alt={`photos ${index}`}
                        style={{ width: "212px", height: "212px" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center w-[100%] h-[400px]">
            <Spinner />
          </div>
        )}
      </div>
      {data?.name === "seller" && (
        <div
          className=" mt-5 fixed bottom-0 w-full"
          style={{ width: "-webkit-fill-available" }}
        >
          <div
            className=" flex justify-end gap-x-4 shadow-lg border-[1px]  bg-[#FFFFFF]  p-[24px] rounded-tr-[24px] rounded-tl-[24px]"
            style={{ width: "-webkit-fill-available" }}
          >
            <div className="">
              <button
                type="submit"
                onClick={() => setSideDrawer({ isOpen: false, data: {} })}
                className={`bg-black w-full text-white px-4 py-2.5 text-sm font-semibold rounded shadow-md hover:shadow-lg`}
              >
                CLOSE
              </button>
            </div>

            <div className="">
              {isLoading ? (
                <button className=" flex justify-center items-center border-red-300 border-2 w-full text-red-500 px-4 py-2 text-sm font-semibold rounded shadow-md hover:shadow-lg">
                  <Spinner />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleImageDelete}
                  className={` border-red-300 border-2 w-full text-red-500 px-4 py-2 text-sm font-semibold rounded shadow-md hover:shadow-lg`}
                >
                  DELETE
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideDrawerForImgs;
