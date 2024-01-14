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
import { MemoryRouter as Router } from "react-router-dom";
import SendOTPScreen from "../../screens/Onboarding/Signup/mobileVerification";
import { mobileRegex } from "../../utils/regexCheck";
import "@testing-library/jest-dom";
import CustomButton from "../../components/Button";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("mobile verification screen", () => {
  it("renders without crashing", () => {
    // Render the component
    render(
      <Router>
        <SendOTPScreen />
      </Router>
    );
  });

  it("consists of the input box for mobile", () => {
    // Render the component in isolation
    render(
      <Router>
        <SendOTPScreen />
      </Router>
    );
    // // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
    const mobileElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    expect(mobileElement).toBeInTheDocument();
  });

  it("updates state on input change", async () => {
    // Render the component in isolation
    render(
      <Router>
        <SendOTPScreen />
      </Router>
    );
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    const mobileElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    // Clear the existing value
    userEvent.clear(mobileElement);
    // Simulate a change event on the input field
    userEvent.type(mobileElement, "1234567890");
    // Assert that the component state is updated correctly
    await waitFor(() => {
      expect(mobileElement.value).toBe("1234567890");
    });
  });

  it("validates input for 10-digit numbers", () => {
    // Render the component in isolation
    render(
      <Router>
        <SendOTPScreen />
      </Router>
    );

    // Import and test the input validation function
    const validPhoneNumber = 9969500102;
    // Assert that it returns true for a valid 10-digit number
    const validate = mobileRegex.test(validPhoneNumber);
    // Assert that it returns false
    expect(validate).toBe(true);
  });

  it("Send Otp Button", () => {
    const mockOnClick = jest.fn(() => {
      console.log("Mock on Click");
    });

    render(<CustomButton onClick={mockOnClick} text="SEND OTP" />);

    const otpButton = screen.getByText("SEND OTP");
    expect(otpButton).toBeInTheDocument();
    fireEvent.click(otpButton);
  });
});
