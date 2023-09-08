import React, { useState } from "react";
import CustomInputWithImage from "../../../../components/InputWithImage/InputWithImage";
import { parse } from "date-fns";

//Icon
import CalenderIcon from "../../../../assets/calendar.svg";
import RightSideModal from "../../../../components/CustomModal/customRightModal";
import SelectDateModalContent from "../../PickUp/selectDateModal";

interface IPickupDateProps {
  data: {
    pickupAddress: any;
    setPickupAddress: any;
  };
}

const PickupDate: React.FunctionComponent<IPickupDateProps> = ({
  data: {
    pickupAddress: { pickupAddress: globalPickupAddress },
    setPickupAddress,
  },
}) => {
  const [isDateRightModal, setIsDateRightModal] = useState(false);

  function convertToEpoch(dateTimeString: any) {
    const parsedDateTime = parse(
      dateTimeString,
      "dd/MM/yyyy hh:mm a",
      new Date()
    );
    return Math.floor(parsedDateTime.getTime() / 1000);
  }

  const handlePickupTimeSelected = (pickupTime: string) => {
    const editedPickupDateForEpoch = pickupTime?.substring(0, 19);
    const epochPickupDate = convertToEpoch(editedPickupDateForEpoch);
    // setPickupAddress((prevData: any) => ({
    //   ...prevData,
    //   pickupAddress: { ...prevData.pickupAddress, pickupDate: epochPickupDate },
    // }));
  };

  return (
    <div className="grid grid-cols-3 my-5 px-5">
      <div className="mr-6">
        <CustomInputWithImage
          placeholder="Pickup Date"
          imgSrc={CalenderIcon}
          value={globalPickupAddress?.pickupDate}
          onClick={() => setIsDateRightModal(true)}
          // onChange={(e) => setPickupDate(e.target.value)}
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
