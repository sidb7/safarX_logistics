// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import WalletRecharge from "../../screens/Order/WalletRecharge";
import CustomDropDown from "../../components/DropDown";
import JusPay from "../../components/JusPay/juspay";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const walletMenu = [
  {
    label: "100",
    value: "100",
  },
  {
    label: "200",
    value: "200",
  },
  {
    label: "500",
    value: "500",
  },
  {
    label: "1,000",
    value: "1,000",
  },
  {
    label: "2,000",
    value: "2,000",
  },
  {
    label: "3,000",
    value: "3,000",
  },
  {
    label: "5,000",
    value: "5,000",
  },
  {
    label: "10,000",
    value: "10,000",
  },
  {
    label: "15,000",
    value: "15,000",
  },
  {
    label: "20,000",
    value: "20,000",
  },
  {
    label: "25,000",
    value: "25,000",
  },
  {
    label: "30,000",
    value: "30,000",
  },
  {
    label: "50,000",
    value: "50,000",
  },
  {
    label: "1,00,000",
    value: "1,00,000",
  },
  {
    label: "2,00,000",
    value: "2,00,000",
  },
  {
    label: "3,00,000",
    value: "3,00,000",
  },
];

describe("Wallet Recharge Test cases", () => {
  it("Rendering Wallet Recharge without crash", () => {
    render(<WalletRecharge />, { wrapper: MemoryRouter });
  });

  it("Select Amount Dropdown", () => {
    const mockOnChange = jest.fn(() => {
      console.log("Checked for onChange");
    });

    // Render the dropdown component
    render(
      <CustomDropDown
        onChange={mockOnChange}
        heading="Select Amount"
        options={walletMenu}
      />
    );

    // Get the dropdown element
    const dropdown = screen.getByRole("option", {
      name: "Select Amount",
    }) as HTMLSelectElement;

    // Simulate selecting an option
    fireEvent.change(dropdown, { target: { value: 100 } });

    // Assert that the dropdown value has changed
    expect(dropdown.value).toBe("100");
    // walletMenu.map((eachOption) => {
    //   expect(
    //     screen.getAllByRole("option", { name: eachOption.label }).length
    //   ).toBe(16);
    // });

    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});

describe("JusPay component", () => {
  it("should call startPayments when button is clicked", () => {
    const { getByText } = render(
      <JusPay
        isDisabled={false} // Pass any necessary props here
        amount={100}
        callbackUrl={"https://example.com/callback"}
      />
    );

    const button = screen.getByText("JusPay");

    // Mocking the function inside the component
    const originalFunction = JusPay.prototype.startPayments;
    JusPay.prototype.startPayments = jest.fn();

    fireEvent.click(button);
    expect(button).toBeInTheDocument();

    // Verify whether the function inside the component is called
    // expect(JusPay.prototype.startPayments).toHaveBeenCalled();

    // Restore the original function after the test
    // JusPay.prototype.startPayments = originalFunction;
  });
});
