// @ts-nocheck
import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import VerifyOTPScreen from "../../screens/Onboarding/Signup/verifyOtp";
import OffersScreen from "../../screens/Onboarding/Signup/offerScreen";
import GetStartedScreen from "../../screens/Onboarding/Signup/getStarted";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("verify otp screen test cases", () => {
  it("the following component of the screen renders without crashing", () => {
    // Render the component
    render(
      <Router>
        <VerifyOTPScreen />
      </Router>
    );
  });

  it("the following component of the screen checks whether the input field exists", () => {
    // Render the component
    render(
      <Router>
        <VerifyOTPScreen />
      </Router>
    );
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();
    const otpElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    expect(otpElement).toBeInTheDocument();
  });

  it("check that the follwoing components element is taking the desired value and the state is updated", async () => {
    //render the component in isolation
    render(
      <Router>
        <VerifyOTPScreen />
      </Router>
    );
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug();

    const inputOtpNoElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });

    userEvent.type(inputOtpNoElement, "12345");
    // Assert that the component state is updated correctly
    await waitFor(() => {
      expect(inputOtpNoElement.value).toBe("12345");
    });

    // Clear the existing value
    userEvent.clear(inputOtpNoElement);
    // test with invalid input
    userEvent.type(inputOtpNoElement, "tanmay");

    await waitFor(() => {
      expect(inputOtpNoElement.value).toBe("");
    });
  });

  it("test with invalid input with mix of numbers and strings", async () => {
    // Render the component
    render(
      <Router>
        <VerifyOTPScreen />
      </Router>
    );
    const inputOtpNoElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    // Clear the existing value
    // userEvent.clear(inputOtpNoElement);
    // test with input more than 6 digits
    userEvent.type(inputOtpNoElement, "1234");

    await waitFor(() => {
      expect(inputOtpNoElement.value).toBe("");
    });
  });

  //   it("check that the follwoing components element to test with invalid input with mix of numbers and strings", async () => {
  //     //render the component in isolation
  //     render(
  //       <Router>
  //         <VerifyOTPScreen />
  //       </Router>
  //     );
  //     // eslint-disable-next-line testing-library/no-debugging-utils
  //     // screen.debug();

  //     const inputOtpNoElement = screen.getByRole("textbox", {
  //       inputMode: "numeric",
  //     });

  //     // Clear the existing value
  //     userEvent.clear(inputOtpNoElement);

  //     // test with invalid input with mix of numbers and strings
  //     userEvent.type(inputOtpNoElement, "123abc456");

  //     await waitFor(() => {
  //       expect(inputOtpNoElement.value).toBe("123456");
  //     });
  //   });

  it("render the offers page", () => {
    // Render the component
    render(
      <Router>
        <OffersScreen />
      </Router>
    );
  });

  it("render the get started page", () => {
    // Render the component
    render(
      <Router>
        <GetStartedScreen />
      </Router>
    );
  });
});
