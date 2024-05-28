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
import { toast } from "react-hot-toast";
import {
  GET_SELLER_BOX_DETAILS,
  GET_COMPANY_BOX_DETAILS,
} from "../../../../utils/ApiUrls";
import { Spinner } from "../../../../components/Spinner";
import SellerBoxDetails from "./SellerBoxDetails";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import BottomModal from "../../../../components/CustomModal/customBottomModal";
import WebCrossIcon from "../../../../assets/PickUp/ModalCrossWeb.svg";
import DeleteGifIcon from "../../../../assets/deleteGif.svg";
import ServiceButton from "../../../../components/Button/ServiceButton";
import CenterModal from "../../../../components/CustomModal/customCenterModal";
import PaginationComponent from "../../../../components/Pagination";
import OneButton from "../../../../components/Button/OneButton";

const BoxCatalogue = forwardRef((props: any, ref: any) => {
  const { filterId, setFilterId } = props;
  const [isOpenBottomModal, setIsOpenBottomModal] = useState(false);
  const [tempSellerBoxDetails, setTempSellerBoxDetails] = useState<any>({});
  const isMobileView = useMediaQuery({ maxWidth: 768 });
  const [filterData, setFilterData] = useState([
    { label: "Seller Box", isActive: false },
    // { label: "Company Box", isActive: false },
  ]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBoxIndex, setDeleteBoxIndex] = useState(null);
  const [deleteData, setDeleteData] = useState({});
  const [isSellerBoxDetailsModal, setSellerBoxDetailsModal] =
    useState<any>(false);

  useImperativeHandle(ref, () => ({
    openModal() {
      setSellerBoxDetailsModal(true);
      setTempSellerBoxDetails({});
    },
  }));

  const [loading, setLoading] = useState(false);
  const [boxDetails, setBoxDetails] = useState<any>();
  const [totalItemCount, setTotalItemCount] = useState(0);

  //on page change index
  const onPageIndexChange = async (pageIndex: any) => {
    const { data } = await POST(GET_SELLER_BOX_DETAILS, {
      skip: (pageIndex?.currentPage - 1) * pageIndex?.itemsPerPage,
      limit: pageIndex?.itemsPerPage,
      pageNo: pageIndex?.currentPage,
    });
    if (data?.success) {
      setBoxDetails(data?.data);
      setTotalItemCount(data?.totalBox);
    } else {
      setBoxDetails([]);
      toast.error(data?.message);
    }
  };

  // on per page item change
  const onPerPageItemChange = async (pageperItem: any) => {
    const { data } = await POST(GET_SELLER_BOX_DETAILS, {
      skip: (pageperItem?.currentPage - 1) * pageperItem?.itemsPerPage,
      limit: pageperItem?.itemsPerPage,
      pageNo: pageperItem?.currentPage,
    });
    if (data?.success) {
      setBoxDetails(data?.data);
      setTotalItemCount(data?.totalBox);
    } else {
      setBoxDetails([]);
      toast.error(data?.message);
    }
  };

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
                // className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] ${
                //   filterId === index
                //     ? `${
                //         index === filterData.length - 1
                //           ? "rounded-r-md"
                //           : "rounded-l-md"
                //       } bg-[#D2D2D2] font-medium text-[#1C1C1C]`
                //     : ""
                // }`}
                className={`flex items-center py-[8px] px-[16px] border-[1px] border-[#A4A4A4] bg-[#D2D2D2] font-medium text-[#1C1C1C]`}
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
      setTotalItemCount(allAddressData?.totalBox);
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
    if (isMobileView) {
      setIsOpenBottomModal(true);
    } else {
      setSellerBoxDetailsModal(true);
    }
    setTempSellerBoxDetails(boxDetails);
  };

  const handleCloseBoxDetailModal = () => {
    if (isMobileView) {
      setIsOpenBottomModal(false);
    } else {
      setSellerBoxDetailsModal(false);
    }
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

  const deleteModalContent = (data: any, deleteBoxIndex: any) => {
    return (
      <div className="flex flex-col  h-full w-full   p-5">
        <div className="flex justify-end">
          <img
            src={WebCrossIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setIsDeleteModalOpen(false)}
          />
        </div>
        <div className="flex flex-col justify-center  items-center h-full w-full  ">
          <img src={DeleteGifIcon} alt="" />
          <p className="font-Open text-sm md:text-base font-semibold text-center">
            Are you sure you want to delete this box?
          </p>
          <div className="flex  items-center gap-x-4 mt-10">
            {/* <OneButton
              text={"Yess"}
              onClick={() => {
                deleteSellerBox(data, deleteBoxIndex);
                setIsDeleteModalOpen(false);
              }}
              className="px-4 py-2"
            /> */}
            <ServiceButton
              text="Yes"
              className="bg-[#ffffff] px-4 py-2 text-[#1c1c1c] font-semibold text-sm"
              onClick={() => {
                deleteSellerBox(data, deleteBoxIndex);
                setIsDeleteModalOpen(false);
              }}
            />
            <ServiceButton
              text="No"
              className="bg-[#1C1C1C] px-4 py-2 text-white font-semibold text-sm"
              onClick={() => setIsDeleteModalOpen(false)}
            />
          </div>
        </div>
      </div>
    );
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

          <div className="customScroll">
            {/* <div className="flex  flex-wrap customScroll gap-x-4"> */}
            <div className="flex flex-col lg:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-center mt-1 gap-y-6 pt-4">
              {boxDetails?.map((data: any, index: any) => {
                return (
                  // display package box
                  <div className="w-[95%]">
                    <PackageBox
                      key={index}
                      boxType={data?.color}
                      volumetricWeight={data?.volumetricWeight}
                      packageType={data?.name || 0}
                      breadth={data?.breadth || 0}
                      length={data?.length || 0}
                      height={data?.height || 0}
                      showAction={filterId === 0 && true}
                      // deleteSellerBox={() => deleteSellerBox(data, index)}
                      handleAction={() => {
                        handlUpdateSellerBox(data);
                      }}
                      setIsDeleteModalOpen={setIsDeleteModalOpen}
                      setDeleteBoxIndex={setDeleteBoxIndex}
                      index={index}
                      data={data}
                      setDeleteData={setDeleteData}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {totalItemCount > 0 && (
            <PaginationComponent
              totalItems={totalItemCount}
              itemsPerPageOptions={[10, 20, 30, 50]}
              onPageChange={onPageIndexChange}
              onItemsPerPageChange={onPerPageItemChange}
            />
          )}
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

      {isDeleteModalOpen && (
        <CenterModal
          isOpen={isDeleteModalOpen}
          className="!w-[30%] !h-[40%] !absolute !z-20 "
          onRequestClose={() => setIsDeleteModalOpen(false)}
        >
          {deleteModalContent(deleteData, deleteBoxIndex)}
        </CenterModal>
      )}

      <BottomModal
        isOpen={isOpenBottomModal}
        onRequestClose={() => setIsOpenBottomModal(false)}
        className="h-[30rem] outline-none !p-0"
      >
        <SellerBoxDetails
          updateBoxApi={() => handleCloseBoxDetailModal()}
          setSellerBoxDetailsModal={setIsOpenBottomModal}
          tempSellerBoxDetails={tempSellerBoxDetails}
          isMobileView={isMobileView}
        />
      </BottomModal>
    </>
  );
});

export default BoxCatalogue;
