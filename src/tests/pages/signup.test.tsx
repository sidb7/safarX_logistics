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
import { MemoryRouter } from "react-router-dom";
import SignUpScreen from "../../screens/Onboarding/Signup/index";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@testing-library/jest-dom";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("SignUp Component", () => {
  it("renders without crashing", () => {
    render(
      <GoogleOAuthProvider>
        <SignUpScreen />
      </GoogleOAuthProvider>,

      { wrapper: MemoryRouter }
    );

    const fName = screen.getByLabelText("First Name");
    expect(fName).toBeInTheDocument();
    userEvent.type(fName, " ");

    const lName = screen.getByLabelText("Last Name");
    expect(lName).toBeInTheDocument();
    userEvent.type(lName, " ");

    const email = screen.getByLabelText("Email");
    expect(email).toBeInTheDocument();
    userEvent.type(email, " ");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    userEvent.type(password, " ");

    const referalCode = screen.getByLabelText("Referal Code");
    expect(referalCode).toBeInTheDocument();
    userEvent.type(referalCode, " ");

    const signUpButton = screen.getByText("SIGN UP");
    expect(signUpButton).toBeInTheDocument();

    fireEvent.click(signUpButton);
  });
});
