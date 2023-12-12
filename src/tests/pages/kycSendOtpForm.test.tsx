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
import WelcomeHeader from "../../screens/Onboarding/Kyc/welcomeHeader";
import AddButton from "../../components/Button/addButton";
import Card from "../../screens/Onboarding/Kyc/SelectAddress/card";
import ServiceButton from "../../components/Button/ServiceButton";
import SendOtpForm from "../../screens/Onboarding/Kyc/SendOtpForm";
import CustomInputBox from "../../components/Input";
import TimerCounter from "../../components/TimerCountdown";

import { Spinner } from "../../components/Spinner";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("KYC Send OTP Form test cases", () => {
  it("Rendering Send OTP Form", () => {
    render(<SendOtpForm />, { wrapper: MemoryRouter });
  });

  it("Rendering Welcome Header", () => {
    render(
      <WelcomeHeader
        title="Welcome to Shipyaari"
        content="Kindly complete your KYC"
      />
    );
  });

  it("Aadhar Input Box", () => {
    const value = 497292094762;
    const mockOnChange = jest.fn(() => {
      console.log("Change Aadhar", aadharInputBox.value);
    });
    render(
      <CustomInputBox
        label="Aadhar Number"
        onChange={mockOnChange}
        id={"aadharNumber"}
        inputMode={"numeric"}
        inputType="text"
      />
    );
    const aadharInputBox = screen.getByLabelText(
      "Aadhar Number"
    ) as HTMLInputElement;
    expect(aadharInputBox).toBeInTheDocument();
    fireEvent.change(aadharInputBox, { target: { value: value } });
    expect(aadharInputBox).toHaveValue(aadharInputBox.value);
    expect(aadharInputBox.value.length).toBe(12);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("PAN Input Box", () => {
    const value = "EAYPP8712G";
    const mockOnChange = jest.fn(() => {
      console.log("Change PAN", panInputBox.value);
    });
    render(
      <CustomInputBox
        label="PAN Number"
        onChange={mockOnChange}
        id={"panNumber"}
      />
    );
    const panInputBox = screen.getByLabelText("PAN Number") as HTMLInputElement;
    expect(panInputBox).toBeInTheDocument();
    fireEvent.change(panInputBox, { target: { value: value } });
    expect(panInputBox).toHaveValue(panInputBox.value);
    expect(panInputBox.value.length).toBe(10);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("Enter Aadhar OTP", () => {
    const value = 497298;
    const mockOnChange = jest.fn(() => {
      console.log("Change Enter Aadhar OTP", aadharOtpInputBox.value);
    });
    render(
      <CustomInputBox
        label="Enter Aadhar OTP"
        onChange={mockOnChange}
        id={"aadharOtp"}
        inputMode={"numeric"}
        inputType="text"
      />
    );
    const aadharOtpInputBox = screen.getByLabelText(
      "Enter Aadhar OTP"
    ) as HTMLInputElement;
    expect(aadharOtpInputBox).toBeInTheDocument();
    fireEvent.change(aadharOtpInputBox, { target: { value: value } });
    expect(aadharOtpInputBox).toHaveValue(aadharOtpInputBox.value);
    expect(aadharOtpInputBox.value.length).toBe(6);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("Rendering Timer Counter", () => {
    render(<TimerCounter />, { wrapper: MemoryRouter });
  });

  it("GST Input Box", () => {
    const value = "27AALCA5307N1ZC";
    const mockOnChange = jest.fn(() => {
      console.log("Change GST Number", gstInputBox.value);
    });
    render(
      <CustomInputBox
        label="GST Number"
        onChange={mockOnChange}
        id={"gstNumber"}
      />
    );
    const gstInputBox = screen.getByLabelText("GST Number") as HTMLInputElement;
    expect(gstInputBox).toBeInTheDocument();
    fireEvent.change(gstInputBox, { target: { value: value } });
    expect(gstInputBox).toHaveValue(gstInputBox.value);
    expect(gstInputBox.value.length).toBe(15);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("Enter GST OTP", () => {
    const value = 4972;
    const mockOnChange = jest.fn(() => {
      console.log("Change Enter GST OTP", gstOtpInputBox.value);
    });
    render(
      <CustomInputBox
        label="Enter GST OTP"
        onChange={mockOnChange}
        id={"gstOtp"}
        inputMode={"numeric"}
        inputType="text"
      />
    );
    const gstOtpInputBox = screen.getByLabelText(
      "Enter GST OTP"
    ) as HTMLInputElement;
    expect(gstOtpInputBox).toBeInTheDocument();
    fireEvent.change(gstOtpInputBox, { target: { value: value } });
    expect(gstOtpInputBox).toHaveValue(gstOtpInputBox.value);
    expect(gstOtpInputBox.value.length).toBe(4);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("Verify OTP", () => {
    const mockOnSubmit = jest.fn(() => {
      console.log("Verify OTP Button click");
    });

    render(
      <ServiceButton
        text="VERIFY OTP"
        onClick={mockOnSubmit}
        btnType="submit"
      />
    );
    const buttonElement = screen.getByText("VERIFY OTP");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("SEND OTP", () => {
    const mockOnSubmit = jest.fn(() => {
      console.log("SEND OTP Button click");
    });

    render(
      <ServiceButton text="SEND OTP" onClick={mockOnSubmit} btnType="submit" />
    );
    const buttonElement = screen.getByText("SEND OTP");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("Spinner rendering", () => {
    render(<Spinner />, { wrapper: MemoryRouter });
  });
});
