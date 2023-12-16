import React, { useState } from "react";
import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
import { parse } from "date-fns";
import { useMediaQuery } from "react-responsive";
import "../../../../styles/bottomSheetForMobile.css";
// Icon
import CalenderIcon from "../../../../assets/calendar.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import SelectDateModalContent from "../../PickUp/selectDateModal";

interface IPickupDateProps {
  epochPickupDate: any;
  inputError?: boolean;
}

const PickupDate: React.FunctionComponent<IPickupDateProps> = ({
  epochPickupDate,
  inputError,
}) => {
  const isLgScreen = useMediaQuery({ query: "(min-width: 640px)" });

  const [isDateRightModal, setIsDateRightModal] = useState(false);
  const [pickupDate, setPickupDate] = useState("");

  function convertToEpoch(dateTimeString: any) {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime());
  }

  const handlePickupTimeSelected = (pickupTime: string) => {
    setPickupDate(pickupTime);
    const editedPickupDateForEpoch = pickupTime?.substring(0, 19);
    epochPickupDate(convertToEpoch(editedPickupDateForEpoch));
  };

  return (
    <div className="flex my-5 px-5 pb-[100px]">
      <CustomInputWithImage
        placeholder="Pickup Date"
        imgSrc={CalenderIcon}
        value={pickupDate}
        onClick={() => setIsDateRightModal(true)}
        inputError={inputError}
        inputClassName="w-[300px]"
      />

      <RightSideModal
        isOpen={isDateRightModal}
        onClose={() => setIsDateRightModal(false)}
        className={`w-full ${
          isLgScreen ? "md:!w-[389px]" : "mobile-modal-styles"
        }`}
      >
        <SelectDateModalContent
          onClick={() => setIsDateRightModal(false)}
          onPickupTimeSelected={handlePickupTimeSelected}
        />
      </RightSideModal>
    </div>
  );
};

export default PickupDate;
