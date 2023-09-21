import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import BoxIcon from "../../../../assets/Catalogue/box.svg";
import PackageBox from "../../Product/PackageBox";
import { POST } from "../../../../utils/webService";
import CustomRightModal from "../../../../components/CustomModal/customRightModal";
import { DELETE_SELLER_BOX } from "../../../../utils/ApiUrls";
import { toast } from "react-toastify";
import {
  GET_SELLER_BOX_DETAILS,
  GET_COMPANY_BOX_DETAILS,
} from "../../../../utils/ApiUrls";
import { Spinner } from "../../../../components/Spinner";
import SellerBoxDetails from "./SellerBoxDetails";

const BoxCatalogue = forwardRef((props: any, ref: any) => {
  const { filterId, setFilterId } = props;
  const [tempSellerBoxDetails, setTempSellerBoxDetails] = useState<any>({});
  const [filterData, setFilterData] = useState([
    { label: "Seller Box", isActive: false },
    { label: "Company Box", isActive: false },
  ]);
  const [isSellerBoxDetailsModal, setSellerBoxDetailsModal] = useState<any>(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      setSellerBoxDetailsModal(true);
      setTempSellerBoxDetails({});
    },
  }));

  const [loading, setLoading] = useState(false);
  const [boxDetails, setBoxDetails] = useState<any>();
  const filterComponent = (className?: string) => {
    return (
      <div className="flex  mt-6">
        <div
          className={`flex text-[14px] text-[#777777] font-medium h-[44px] cursor-pointer`}
        >
          {filterData?.map((singleData, index) => {
            return (
              <span
                key={index}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                  filterId === index
                    ? `${
                        index === filterData.length - 1
                          ? "rounded-r-md"
                          : "rounded-l-md"
                      } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                    : ""
                }`}
                onClick={() => setFilterId(index)}
              >
                {singleData.label}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  const getBoxsApi = async () => {
    const { data: allAddressData }: any = await POST(
      filterId === 0 ? GET_SELLER_BOX_DETAILS : GET_COMPANY_BOX_DETAILS
    );
    if (allAddressData?.success) {
      setBoxDetails(allAddressData.data);
      setLoading(false);
    } else {
      toast.error(allAddressData?.message);
      setBoxDetails([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getBoxsApi();
  }, [filterId]);

  const handlUpdateSellerBox = (boxDetails: any) => {
    setTempSellerBoxDetails(boxDetails);
    setSellerBoxDetailsModal(true);
  };

  const handleCloseBoxDetailModal = () => {
    setSellerBoxDetailsModal(false);
    getBoxsApi();
  };

  const deleteSellerBox = async (boxDetailsData: any, index: number) => {
    const { boxId } = boxDetailsData;
    const { data } = await POST(DELETE_SELLER_BOX, { boxId });
    if (data?.success) {
      toast.success(data?.message);
      let tempArr = boxDetails;
      tempArr.splice(index, 1);
      setBoxDetails([...tempArr]);
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      ) : (
        <div>
          {filterComponent()}
          <div className="flex items-center mt-6 gap-x-2">
            <img src={BoxIcon} alt="" />
            <span className="font-bold font-Lato  text-lg lg:text-2xl text-[#323232] ">
              {filterId === 0 ? "Seller Box" : "Company Box"}
            </span>
          </div>

          <div className="flex overflow-x-scroll">
            <div className="flex  flex-wrap overflow-x-scroll gap-x-4">
              {boxDetails?.map((data: any, index: any) => {
                return (
                  // display package box
                  <PackageBox
                    key={index}
                    boxType={data?.color}
                    volumetricWeight={data?.volumetricWeight}
                    packageType={data?.name || 0}
                    breadth={data?.breadth || 0}
                    length={data?.length || 0}
                    height={data?.height || 0}
                    showAction={true}
                    deleteSellerBox={() => deleteSellerBox(data, index)}
                    handleAction={() => handlUpdateSellerBox(data)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
      <CustomRightModal
        isOpen={isSellerBoxDetailsModal}
        onClose={() => setSellerBoxDetailsModal(false)}
      >
        <SellerBoxDetails
          updateBoxApi={() => handleCloseBoxDetailModal()}
          setSellerBoxDetailsModal={setSellerBoxDetailsModal}
          tempSellerBoxDetails={tempSellerBoxDetails}
        />
      </CustomRightModal>
    </>
  );
});

export default BoxCatalogue;
