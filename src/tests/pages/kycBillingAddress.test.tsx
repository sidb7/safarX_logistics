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
import KYCBillingAddress from "../../screens/Onboarding/Kyc/SelectAddress/billing";
import WelcomeHeader from "../../screens/Onboarding/Kyc/welcomeHeader";
import AddButton from "../../components/Button/addButton";
import Card from "../../screens/Onboarding/Kyc/SelectAddress/card";
import ServiceButton from "../../components/Button/ServiceButton";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Test Cases for KYC Billing Address", () => {
  it("Rendering Billing Address", () => {
    render(<KYCBillingAddress />, { wrapper: MemoryRouter });
  });

  it("Rendering Welcome Header", () => {
    <WelcomeHeader
      title="Welcome to Shipyaari"
      content="Select your"
      whichAddress="Billing"
      Address="Address"
    />;
  });

  it("Add Address Button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Clicked Add Address");
    });

    render(<AddButton text={"ADD ADDRESS"} onClick={mockOnClick} />);

    const buttonElement = screen.getByText("ADD ADDRESS");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Address Card", () => {
    const mockAddressCardClick = jest.fn(() => {
      console.log("Address Card Clicked");
    });

    render(<Card name="" value="" title="" onClick={mockAddressCardClick} />);
  });

  it("Submit Button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Submit Button Clicked");
    });

    render(<ServiceButton text={"SUBMIT"} onClick={mockOnClick} />);

    const buttonElement = screen.getByText("SUBMIT");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
