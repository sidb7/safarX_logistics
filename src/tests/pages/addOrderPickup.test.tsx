import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import KYCPickupAddress from "../../screens/Onboarding/Kyc/SelectAddress/pickup";
import WelcomeHeader from "../../screens/Onboarding/Kyc/welcomeHeader";
import AddButton from "../../components/Button/addButton";
import Card from "../../screens/Onboarding/Kyc/SelectAddress/card";
import ServiceButton from "../../components/Button/ServiceButton";

import PickupLocation from "../../screens/NewOrder/NewPickup";
import Stepper from "../../components/Stepper";
import ReturningPickUp from "../../screens/NewOrder/ReturningUser/PickUp";
import PickupAddress from "../../screens/NewOrder/NewPickup/PickupAddress/pickupLocation";
import CustomCheckBox from "../../components/CheckBox";
import PickupDate from "../../screens/NewOrder/NewPickup/PickupDate/pickupDate";
import CustomBranding from "../../screens/NewOrder/NewPickup/CustomBranding/customBranding";
import BottomLayout from "../../components/Layout/bottomLayout";
import { v4 as uuidv4 } from "uuid";
import AddressCard from "../../screens/NewOrder/NewPickup/PickupAddress/addressCard";
import ContactDetails from "../../screens/NewOrder/NewPickup/ContactDetails/contactDetails";
import SaveAddress from "../../screens/NewOrder/NewPickup/SaveAddress/saveAddress";
import AddressTiming from "../../screens/NewOrder/NewPickup/Timing/addressTiming";
import RightModalContent from "../../screens/NewOrder/NewPickup/RightModal/ModalContent";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Add Order Pickup Location", () => {
  it("Rendering pickup location screen", () => {
    render(<PickupLocation />, { wrapper: MemoryRouter });
  });

  it("Stepper rendering", () => {
    render(<Stepper steps={[]} />);
  });

  it("Rendering ReturningPickUp User", () => {
    const returningUserData: any = [];
    const setReturningUserData = () => {};

    render(
      <ReturningPickUp
        data={{
          returningUserData,
          setReturningUserData,
          onAddressSelect: () => {},
        }}
      />
    );
  });

  it("Rendering Pickup Address", () => {
    const pickupAddress: any = {
      pickupAddress: {
        fullAddress: "",
        flatNo: "",
        locality: "",
        sector: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        addressType: "warehouse",
        workingDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
        workingHours: "09:00",
        contact: {
          name: "",
          mobileNo: "",
          alternateMobileNo: "",
          emailId: "",
          type: "warehouse associate",
        },
        pickupDate: "",
      },
      returnAddress: {
        fullAddress: "",
        flatNo: "",
        locality: "",
        sector: "",
        landmark: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
        addressType: "warehouse",
        workingDays: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: true,
          sunday: true,
        },
        workingHours: "09:00",
        contact: {
          name: "",
          mobileNo: "",
          alternateMobileNo: "",
          emailId: "",
          type: "warehouse associate",
        },
      },
      branding: {
        id: uuidv4(),
        name: "",
        logo: "",
        address: "",
        contact: {
          name: "",
          mobileNo: "",
        },
        isActive: false,
      },
    };

    const setPickupAddress = () => {};
    const inputError = true;
    const setInputError = () => {};
    const data: any = [];

    render(
      <PickupAddress
        data={{
          pickupAddress,
          setPickupAddress,
          inputError,
          setInputError,
        }}
      />,
      { wrapper: MemoryRouter }
    );

    render(<AddressCard data={{ ...data, inputError: inputError }} />);
    render(<ContactDetails data={{ ...data, inputError, setInputError }} />);
  });

  it("Custom Checkbox", () => {
    const omMockChange = jest.fn(() => {});

    render(<CustomCheckBox onChange={omMockChange} checked={true} />);
  });

  it("Pickup Date", () => {
    render(<PickupDate epochPickupDate={() => {}} inputError={false} />);
  });

  it("Custom Branding", () => {
    const pickupAddress: any = [];
    const setPickupAddress = () => {};

    render(
      <CustomBranding
        data={{
          pickupAddress,
          setPickupAddress,
        }}
      />
    );
  });

  it("Bottom Layout", () => {
    render(<BottomLayout />, { wrapper: MemoryRouter });
  });

  it("Right Modal", () => {
    const mockOnChange = jest.fn(() => {});

    render(
      <RightModalContent
        handlePickupAddressChange={mockOnChange}
        onCustomAddressTypeSelection={mockOnChange}
      />
    );
  });
});
