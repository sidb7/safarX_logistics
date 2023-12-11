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
    // userEvent.type(fName, " ");
    fireEvent.change(fName, { target: { value: "Naga" } });
    expect(fName).toHaveValue("Naga");

    const lName = screen.getByLabelText("Last Name");
    expect(lName).toBeInTheDocument();
    fireEvent.change(lName, { target: { value: "Naga" } });
    expect(lName).toHaveValue("Naga");
    // userEvent.type(lName, " ");

    const email = screen.getByLabelText("Email");
    expect(email).toBeInTheDocument();
    fireEvent.change(email, { target: { value: "Naga@gmail.com" } });
    expect(email).toHaveValue("Naga@gmail.com");
    // userEvent.type(email, " ");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    fireEvent.change(password, { target: { value: "Test@12345" } });
    expect(password).toHaveValue("Test@12345");
    // userEvent.type(password, " ");

    const referalCode = screen.getByLabelText("Referal Code");
    expect(referalCode).toBeInTheDocument();
    fireEvent.change(referalCode, { target: { value: "Test1" } });
    expect(referalCode).toHaveValue("Test1");
    // userEvent.type(referalCode, " ");

    const signUpButton = screen.getByText("SIGN UP");
    expect(signUpButton).toBeInTheDocument();
    fireEvent.click(signUpButton);
    // expect(signUpButton).toHaveBeenCalledTimes(1);
  });
});
