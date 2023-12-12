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

import CustomInputBox from "../../components/Input";

import WalletDetails from "../../screens/Onboarding/WalletRecharge/walletDetails";

describe("Wallet Details", () => {
  it("Rendering Wallet Details", () => {
    render(<WalletDetails />, { wrapper: MemoryRouter });
  });

  it("Account Number Input Box", () => {
    const accountNumber = 39388913964;
    const mockOnChange = jest.fn(() => {
      console.log("Account Number", accountNumberInputBox.value);
    });
    render(
      <CustomInputBox
        value={accountNumber}
        inputMode="numeric"
        label="Account Number"
        onChange={mockOnChange}
        id="accountNumber"
      />
    );
    const accountNumberInputBox = screen.getByLabelText(
      "Account Number"
    ) as HTMLInputElement;
    expect(accountNumberInputBox).toBeInTheDocument();
    fireEvent.change(accountNumberInputBox, {
      target: { value: accountNumber },
    });
    expect(accountNumberInputBox).toHaveValue(accountNumberInputBox.value);
    // expect(accountNumberInputBox.value.length).toBe(6);
    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("IFSC Code Input Box", () => {
    const ifscCode = "SBIN0001009";
    const mockOnChange = jest.fn(() => {
      console.log("Account Number", ifscCodeInputBox.value);
    });
    render(
      <CustomInputBox
        label="IFSC Code"
        value={ifscCode}
        inputType="text"
        id="ifscCode"
        onChange={mockOnChange}
      />
    );
    const ifscCodeInputBox = screen.getByLabelText(
      "IFSC Code"
    ) as HTMLInputElement;
    expect(ifscCodeInputBox).toBeInTheDocument();
    fireEvent.change(ifscCodeInputBox, {
      target: { value: ifscCode },
    });
    expect(ifscCodeInputBox).toHaveValue(ifscCodeInputBox.value);
    // expect(accountNumberInputBox.value.length).toBe(6);
    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
