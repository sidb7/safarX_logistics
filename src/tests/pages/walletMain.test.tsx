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
import WalletMain from "../../screens/Onboarding/WalletRecharge/walletMain";
import Checkbox from "../../components/CheckBox";
import CustomButton from "../../components/Button";

describe("Wallet Main Screen", () => {
  it("Wallet Main rendering", () => {
    render(<WalletMain />, { wrapper: MemoryRouter });
  });

  it("Checkbox", () => {
    // render(<Checkbox />);

    const value = true;

    const onChangeCheckbox = jest.fn(() => {
      console.log("Checkbox", checkboxElement.value);
    });

    render(
      <div>
        <Checkbox checked={true} onChange={onChangeCheckbox} />
        <p>Get Discounts/Offers on Recharge</p>
      </div>
    );

    const checkboxElement = screen.getByText(
      "Get Discounts/Offers on Recharge"
    ) as HTMLInputElement;
    expect(checkboxElement).toBeInTheDocument();
    // fireEvent.click(checkboxElement);
    // expect(checkboxElement).toBeChecked();

    // expect(checkboxElement).toBeInTheDocument();
    // fireEvent.change(checkboxElement, { target: { value: value } });
    // expect(checkboxElement).toHaveValue(checkboxElement.value);
    // expect(onChangeCheckbox).toHaveBeenCalledTimes(1);
  });

  it("Recharge Now Button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Recharge now button clicked");
    });

    render(<CustomButton text={"RECHARGE NOW"} onClick={mockOnClick} />);

    const buttonElement = screen.getByText("RECHARGE NOW");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Skip for now button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("skip for now button clicked");
    });

    render(
      <div onClick={mockOnClick}>
        <p>SKIP FOR NOW</p>
      </div>
    );

    const buttonElement = screen.getByText("SKIP FOR NOW");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
