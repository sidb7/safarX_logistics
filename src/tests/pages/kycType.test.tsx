// @ts-nocheck
import React from "react";
import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, MemoryRouter as Router } from "react-router-dom";
import KycBusinessTypeScreen from "../../screens/Onboarding/Kyc/BusinessType";
import Card from "../../screens/Onboarding/Kyc/BusinessType/card";
// import CustomRadioButton from "../../../../components/RadioButton/Index";
import "@testing-library/jest-dom";

import WelcomeHeader from "../../screens/Onboarding/Kyc/welcomeHeader";

import ServiceButton from "../../components/Button/ServiceButton";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("test cases for the kyc type screen", () => {
  it("Business Type Screen renders without crashing", () => {
    render(
      <Router>
        <KycBusinessTypeScreen />
      </Router>
    );
  });

  it("Rendering Welcome Header", () => {
    render(<WelcomeHeader />, { wrapper: MemoryRouter });
  });

  it("Rendering Card", () => {
    render(<Card />, { wrapper: MemoryRouter });
  });

  it("Proceed for KYC button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Proceed for Kyc Click");
    });

    render(
      <ServiceButton
        text="PROCEED FOR KYC"
        className="bg-[#1C1C1C] !font-Open !w-full text-white  !px-4 md:!w-[320px] "
        onClick={mockOnClick}
      />
    );

    const buttonElement = screen.getByText("PROCEED FOR KYC");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Skip for now button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Skip for now Click");
    });

    render(
      <ServiceButton
        text="SKIP FOR NOW"
        className="!text-[#004EFF] !font-Open  underline !border-none"
        onClick={mockOnClick}
      />
    );

    const buttonElement = screen.getByText("SKIP FOR NOW");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
