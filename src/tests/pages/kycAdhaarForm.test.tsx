// @ts-nocheck
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import KycAadharFrom from "../../screens/Onboarding/Kyc/AadharForm";
import { wait } from "@testing-library/user-event/dist/types/utils";
import "@testing-library/jest-dom";
import ServiceButton from "../../components/Button/ServiceButton";
afterEach(cleanup);
jest.mock("../../utils/webService", () => ({
  POST: jest.fn().mockResolvedValue({ data: { success: true } }),
}));
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("KYC Adhaar Form Component", () => {
  //rendering the component
  it("rendering without crashing", () => {
    render(
      <Router>
        <KycAadharFrom />
      </Router>
    );
  });
  //checking the input box
  it("checking the input box", async () => {
    const { getByText } = render(
      <Router>
        <KycAadharFrom />
      </Router>
    );
    const AadhaarLabel = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    expect(AadhaarLabel).toBeInTheDocument();
  });
  //updating the state
  it("updates state on input change", async () => {
    render(
      <Router>
        <KycAadharFrom />
      </Router>
    );
    // screen.debug();
    const AadhaarElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    // Clear the existing value
    userEvent.clear(AadhaarElement);
    // Simulate a change event on the input field
    fireEvent.change(AadhaarElement, { target: { value: "843862474130" } });
    // Assert that the component state is updated correctly
    await waitFor(() => {
      console.log("AadhaarElement", AadhaarElement.value);
      expect(AadhaarElement.value).toBe("843862474130");
    });
  });
  //getting the customButton and checking
  it("renders with the correct text", () => {
    const { getByText } = render(
      <ServiceButton text="SEND OTP" onClick={() => {}} />
    );
    const buttonElement = getByText("SEND OTP");
    expect(buttonElement).toBeInTheDocument();
  });
  //checking whether is button got clicked
  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn(() => {
      console.log("checked for the aadhaar otp");
    });
    const { getByText } = render(
      <ServiceButton text="SEND OTP" onClick={mockOnClick} />
    );
    const buttonElement = getByText("SEND OTP");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
