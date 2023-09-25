import React, { useState } from "react";
import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
import { parse } from "date-fns";

//Icon
import CalenderIcon from "../../../../assets/calendar.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import SelectDateModalContent from "../../PickUp/selectDateModal";
import CustomInputWithIcon from "../../../../components/CustomInputWithIcon/CustomInputWithIcon";

interface IPickupDateProps {
  epochPickupDate: any;
}

const PickupDate: React.FunctionComponent<IPickupDateProps> = ({
  epochPickupDate,
}) => {
  const [isDateRightModal, setIsDateRightModal] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  function convertToEpoch(dateTimeString: any) {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime() / 1000);
  }

  const handlePickupTimeSelected = (pickupTime: string) => {
    setPickupDate(pickupTime);
    const editedPickupDateForEpoch = pickupTime?.substring(0, 19);
    epochPickupDate(convertToEpoch(editedPickupDateForEpoch));
  };

  return (
    <div className="grid grid-cols-3 my-5 px-5">
      <div className="mr-6">
        <CustomInputWithImage
          placeholder="Pickup Date"
          imgSrc={CalenderIcon}
          value={pickupDate}
          onClick={() => setIsDateRightModal(true)}
        />
      </div>

      <RightSideModal
        isOpen={isDateRightModal}
        onClose={() => setIsDateRightModal(false)}
        className="!w-[389px]"
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
