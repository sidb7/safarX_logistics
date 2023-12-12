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
import CustomButton from "../../components/Button";
import Cashondelivery from "../../screens/Onboarding/WalletRecharge/cashOnDelivery";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Cash-On-Delivery", () => {
  it("Rendering COD", () => {
    render(<Cashondelivery />, { wrapper: MemoryRouter });
  });

  it("Yes Button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Yes Button Clicked");
    });
    render(<CustomButton text={"YES"} onClick={mockOnClick} />);
    const buttonElement = screen.getByText("YES");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("Skip Button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Yes Button Clicked");
    });

    render(<CustomButton text={"Skip"} onClick={mockOnClick} />);

    const buttonElement = screen.getByText("Skip");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
