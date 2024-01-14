import React, { useState } from "react";
import LeftArrowIcon from "../../assets/Transaction/backArrow.svg";
import { dummyTransactionFilterData } from "../../utils/dummyData";
import CustomAccordian from "../../components/CustomAccordian";
import FilterPopUpModal from "../../components/CustomModal/customFullScreenModal";
import CrossIcon from "../../assets/Transaction/cross.svg";
import { useNavigate } from "react-router-dom";

interface IPropTypes {}

const Filter = (props: IPropTypes) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);
  return (
    <div>
      <FilterPopUpModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        overlayClassName=""
      >
        <div className="p-5 ">
          <div className="flex items-center justify-between mb-5 ">
            <div className="flex items-center gap-x-2">
              <img src={LeftArrowIcon} alt="" />
              <p className="font-bold text-[18px] text-[#1C1C1C]">Filter</p>
            </div>
            <img
              src={CrossIcon}
              alt=""
              onClick={() => {
                navigate("/transaction");
              }}
            />
          </div>
          <CustomAccordian
            dummyDatas={dummyTransactionFilterData}
            cardClassName="!px-0"
          />
        </div>
      </FilterPopUpModal>
    </div>
  );
};

export default Filter;
