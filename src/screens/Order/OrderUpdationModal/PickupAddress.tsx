//pickupaddress accordian in update modal
import { useEffect, useState } from "react";
import CustomInputBox from "../../../components/Input";
import UpwardArrow from "../../../assets/AccordionUp.svg";
import DownwardArrow from "../../../assets/downwardArrow.svg";
import CustomInputWithImage from "../../../components/InputWithImage/InputWithImage";
import { GET_PINCODE_DATA } from "../../../utils/ApiUrls";
import { POST } from "../../../utils/webService";
import { date_DD_MMM_YYYY_HH_MM_SS } from "../../../utils/dateFormater";
import CustomDate from "../../../components/CustomAccordian/CustomDateWithTime";
import CalenderIcon from "../../../assets/calendar.svg";

const PickupAddress = ({
  completeData,
  setUpdatedData,
  updatedData,
  enabled,
  setPlaceOrderButton,
}: any) => {
  //destructuring the data from the props
  const pickUpData = updatedData?.pickupAddress || {};

  const [accordianOpen, setOpenAccordian] = useState<any>(false);
  const [openDatePicker, setOpenDatePicker] = useState<any>(false);
  const [pickupAddress, setPickupAddress] = useState<any>({
    contact: {
      name: "",
      mobileNo: 0,
      emailID: "",
    },
    flatNo: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    date: "",
  });
  const [validationError, setValidationError] = useState<any>({
    contactName: "",
    mobileNo: "",
    emailID: "",
    pincode: "",
    flatNo: "",
    locality: "",
  });
  const [borderColor, setBorderColor] = useState<string>("#E8E8E8");

  //onChange function for input field
  const handleChange = async (fieldName: string, value: any) => {
    setPlaceOrderButton(false);
    let hasError = false;
    if (fieldName === "pincode") {
      if (value.length === 0) {
        setValidationError({
          ...validationError,
          pincode: "Please Enter Pincode",
        });
        hasError = true;
      } else if (value.length < 6) {
        setValidationError({
          ...validationError,
          pincode: "Pincode must be 6 digits",
        });
        hasError = true;
      } else if (value.length > 6) {
        setValidationError({
          ...validationError,
          pincode: "Pincode must be 6 digits",
        });
        hasError = true;
      } else if (value.length === 6) {
        setValidationError({
          ...validationError,
          pincode: "",
        });

        // Update the pincode in the state
        setPickupAddress((prevState: any) => ({
          ...prevState,
          pincode: value,
        }));

        try {
          const payload = {
            pincode: value,
          };
          const { data } = await POST(GET_PINCODE_DATA, payload);
          if (data.success) {
            // Update the city in the state
            hasError = false;
            setPickupAddress((prevState: any) => ({
              ...prevState,
              city: data?.data?.[0]?.city,
            }));
            setPickupAddress((prevState: any) => ({
              ...prevState,
              state: data?.data?.[0]?.state,
            }));
            setPickupAddress((prevState: any) => ({
              ...prevState,
              country: data?.data?.[0]?.country,
            }));
          } else {
            hasError = true;
          }
        } catch (error: any) {
          hasError = true;

          console.log(error.message);
          setValidationError({
            ...validationError,
            pincode: "Pincode Not Found",
          });
        }
      }

      if (hasError) {
        setBorderColor("red");
      } else {
        setBorderColor("#E8E8E8");
      }
    }
    if (
      fieldName === "contactName" ||
      fieldName === "mobileNo" ||
      fieldName === "emailID"
    ) {
      setPickupAddress({
        ...pickupAddress,
        contact: {
          ...pickupAddress.contact,
          name:
            fieldName === "contactName" ? value : pickupAddress?.contact?.name,
          mobileNo:
            fieldName === "mobileNo" ? value : pickupAddress?.contact?.mobileNo,
          emailID:
            fieldName === "emailID" ? value : pickupAddress?.contact?.emailID,
        },
      });
    } else {
      setPickupAddress((prevState: any) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    setUpdatedData((prevState: any) => ({
      ...prevState,
      pickupAddress: {
        ...pickupAddress,
        fullAddress:
          pickupAddress?.flatNo +
          " " +
          pickupAddress?.locality +
          " " +
          pickupAddress?.landmark +
          " " +
          pickupAddress?.city +
          " " +
          pickupAddress?.state +
          " " +
          pickupAddress?.pincode,
      },
    }));
  };

  //checking for validations of email
  const validateEmailId = (emailID: string) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailID)) {
      setValidationError({
        ...validationError,
        emailID: "",
      });
    } else if (emailID === "") {
      setValidationError({
        ...validationError,
        emailID: "",
      });
    } else {
      setValidationError({
        ...validationError,
        emailID: "Invalid Email",
      });
    }
  };

  //setting the new date
  const handleScheduleDateTimeChange = (selectedDate: Date) => {
    if (
      selectedDate.getHours() == 0 &&
      selectedDate.getMinutes() == 0 &&
      selectedDate.getSeconds() == 0
    ) {
      return;
    }
    setPickupAddress({
      ...pickupAddress,

      date: new Date(selectedDate).getTime(),
    });
    setOpenDatePicker(false);
  };

  //Input validation
  const validation = (fieldName: any, value: any) => {
    let hasError = false;
    if (fieldName === "contactName") {
      if (value.length === 0) {
        setValidationError({
          ...validationError,
          contactName: "Please enter name",
        });

        hasError = true;
      } else {
        setValidationError({
          ...validationError,
          contactName: "",
        });
        hasError = false;
      }
    }
    if (fieldName === "mobileNo") {
      if (value.length === 0) {
        setValidationError({
          ...validationError,
          mobileNo: "Please enter mobile number",
        });

        hasError = true;
      } else if (value.length < 10) {
        setValidationError({
          ...validationError,
          mobileNo: "Invalid Mobile Number",
        });
        hasError = true;
      } else {
        setValidationError({
          ...validationError,
          mobileNo: "",
        });
        hasError = false;
      }
    }
    if (fieldName === "flatNo") {
      if (value.length === 0) {
        setValidationError({
          ...validationError,
          flatNo: "Please enter Flat No",
        });

        hasError = true;
      } else {
        setValidationError({
          ...validationError,
          flatNo: "",
        });
        hasError = false;
      }
    }
    if (fieldName === "locality") {
      if (value.length === 0) {
        setValidationError({
          ...validationError,
          locality: "Please enter locality",
        });

        hasError = true;
      } else {
        setValidationError({
          ...validationError,
          locality: "",
        });
        hasError = false;
      }
    }
    if (fieldName === "pincode") {
      if (value.length === 0) {
        setValidationError({
          ...validationError,
          pincode: "Please enter pincode",
        });

        hasError = true;
      } else {
        setValidationError({
          ...validationError,
          pincode: "",
        });
        hasError = false;
      }
    }
    if (hasError) {
      setBorderColor("red");
    } else {
      setBorderColor("#E8E8E8");
    }
  };

  //Prior useeffect validations
  const priorValidations = (pickUpData: any) => {
    let hasError = false;
    if (
      !pickUpData?.contact ||
      pickUpData?.contact?.name?.length === 0 ||
      pickUpData?.contact?.mobileNo?.length == 0 ||
      pickUpData?.contact?.mobileNo == 0 ||
      pickUpData?.flatNo?.length === 0 ||
      pickUpData?.flatNo === "" ||
      pickUpData?.pincode?.toString()?.length === 0 ||
      pickUpData?.pincode === 0 ||
      pickUpData?.locality === ""
    ) {
      hasError = true;
    }

    console.log("hasError", hasError);
    if (hasError) {
      console.log("red", hasError);
      setBorderColor("red");
    } else {
      setBorderColor("#E8E8E8");
    }
  };

  //setting the state with the initial data which came from props

  useEffect(() => {
    setPickupAddress((prevState: any) => ({
      ...prevState,
      contact: {
        ...prevState?.contact,
        name: pickUpData?.contact?.name,
        mobileNo: pickUpData?.contact?.mobileNo,
        emailID: pickUpData?.contact?.emailId,
      },
      flatNo: pickUpData?.flatNo,
      locality: pickUpData?.locality,
      landmark: pickUpData?.landmark,
      city: pickUpData?.city,
      state: pickUpData?.state,
      country: pickUpData?.country,
      pincode: pickUpData?.pincode,
      date: pickUpData?.pickupDate,
      fullAddress:
        pickupAddress?.flatNo +
        " " +
        pickupAddress?.locality +
        " " +
        pickupAddress?.landmark +
        " " +
        pickupAddress?.city +
        " " +
        pickupAddress?.state +
        " " +
        pickupAddress?.pincode,
    }));

    // Call priorValidations with the current pickUpData
    priorValidations(pickUpData);
  }, [completeData]);

  // This useEffect Added For State Lag Issue --> state is lagging by one event
  useEffect(() => {
    setUpdatedData((prevState: any) => ({
      ...prevState,
      pickupAddress: {
        ...pickupAddress,
        fullAddress:
          pickupAddress?.flatNo +
          " " +
          pickupAddress?.locality +
          " " +
          pickupAddress?.landmark +
          " " +
          pickupAddress?.city +
          " " +
          pickupAddress?.state +
          " " +
          pickupAddress?.pincode,
      },
    }));
  }, [pickupAddress]);

  return (
    <div className="m-4">
      <div
        className={`flex justify-between border p-4 rounded-lg ${
          borderColor === "red" ? "border-red-600" : "border-[#E8E8E8]"
        }`}
        id="pickupaddress"
        onClick={() => setOpenAccordian(!accordianOpen)}
      >
        <p className="text-base">Pickup Address</p>
        {accordianOpen ? (
          <img src={UpwardArrow} alt="icon" />
        ) : (
          <img src={DownwardArrow} alt="icon" />
        )}
      </div>
      {accordianOpen && (
        <div className="mb-4 border-l border-r border-b rounded-lg border-[#E8E8E8] px-4 py-4">
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="grid grid-cols-2 gap-x-4 py-2">
              <div>
                {/* contact name */}
                <CustomInputBox
                  label="Contact Name"
                  value={pickupAddress?.contact?.name}
                  isDisabled={!enabled ? true : false}
                  onChange={(e: any) => {
                    const contactName = e.target.value;
                    handleChange("contactName", contactName);
                    validation("contactName", contactName);
                  }}
                />
                <p className="open-sans text-[12px] text-red-600">
                  {validationError.contactName}
                </p>
              </div>
              <div>
                {/* mobile number */}
                <CustomInputBox
                  label="Mobile No"
                  value={pickupAddress?.contact?.mobileNo}
                  isDisabled={!enabled ? true : false}
                  onChange={(e: any) => {
                    const mobileNo = e.target.value;
                    handleChange(
                      "mobileNo",
                      //mobile number validations
                      mobileNo.replace(/[^0-9]/g, "")
                    );
                    validation("mobileNo", mobileNo);
                  }}
                  maxLength={10}
                />
                <p className="open-sans text-[12px] text-red-600">
                  {validationError.mobileNo}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 py-2">
              <div>
                {/* email id */}
                <CustomInputBox
                  label="Email ID"
                  value={pickupAddress?.contact?.emailID}
                  isDisabled={!enabled ? true : false}
                  onChange={(e: any) => {
                    const email = e.target.value;
                    handleChange("emailID", email);
                    validateEmailId(email);
                  }}
                />
                <p className="open-sans text-[12px] text-red-600">
                  {validationError?.emailID}
                </p>
              </div>
              <div>
                {/* flat no */}
                <CustomInputBox
                  label="Flat No"
                  value={pickupAddress.flatNo}
                  isDisabled={!enabled ? true : false}
                  onChange={(e: any) => {
                    const flatNo = e.target.value;
                    handleChange("flatNo", flatNo);
                    validation("flatNo", flatNo);
                  }}
                />
                <p className="open-sans text-[12px] text-red-600">
                  {validationError?.flatNo}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 py-2">
              <div>
                {/* locality */}
                <CustomInputBox
                  label="Locality"
                  value={pickupAddress.locality}
                  isDisabled={!enabled ? true : false}
                  onChange={(e: any) => {
                    const locality = e.target.value;
                    handleChange("locality", e.target.value);
                    validation("locality", locality);
                  }}
                />
                <p className="open-sans text-[12px] text-red-600">
                  {validationError?.locality}
                </p>
              </div>
              <div>
                {/* landmark */}
                <CustomInputBox
                  label="Landmark"
                  value={pickupAddress.landmark}
                  isDisabled={!enabled ? true : false}
                  onChange={(e: any) => {
                    handleChange("landmark", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 py-2">
              <div>
                {/* city */}
                <CustomInputBox
                  label="City"
                  isDisabled={true}
                  value={pickupAddress.city}
                  onChange={(e: any) => {
                    handleChange("city", e.target.value);
                  }}
                />
              </div>
              <div>
                {/* state */}
                <CustomInputBox
                  label="State"
                  isDisabled={true}
                  value={pickupAddress.state}
                  onChange={(e: any) => {
                    handleChange("state", e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 py-2">
              <div>
                {/* country */}
                <CustomInputBox
                  label="Country"
                  isDisabled={true}
                  value={pickupAddress.country}
                  onChange={(e: any) => {
                    handleChange("country", e.target.value);
                  }}
                />
              </div>
              <div>
                {/* pincode */}
                <CustomInputBox
                  label="Pincode"
                  value={pickupAddress.pincode}
                  isDisabled={!enabled ? true : false}
                  maxLength={6}
                  onChange={(e: any) => {
                    const pincode = e.target.value;
                    // handlePincode(pincode);
                    handleChange("pincode", pincode);
                  }}
                />
                <p className="open-sans text-[12px] text-red-600">
                  {validationError.pincode}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 pb-2 py-2">
              <div>
                {/* pickup date */}
                <CustomInputWithImage
                  placeholder="Pickup Date"
                  imgSrc={CalenderIcon}
                  isDisabled={!enabled ? true : false}
                  value={date_DD_MMM_YYYY_HH_MM_SS(pickupAddress.date)}
                  onClick={() => setOpenDatePicker(true)}
                />
              </div>
              {openDatePicker && (
                <CustomDate
                  onSelect={handleScheduleDateTimeChange}
                  disabled={!enabled ? true : false}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupAddress;
