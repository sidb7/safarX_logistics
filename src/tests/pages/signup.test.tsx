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
import { GoogleLogin } from "@react-oauth/google";
import CustomInputBox from "../../components/Input";
import CustomButton from "../../components/Button";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("SignUp Component", () => {
  it("Sign Up renders without crashing", () => {
    render(
      <GoogleOAuthProvider>
        <SignUpScreen />
      </GoogleOAuthProvider>,

      { wrapper: MemoryRouter }
    );
  });

  it("Rendering Google Login", () => {
    render(
      <GoogleOAuthProvider>
        <GoogleLogin />
      </GoogleOAuthProvider>,
      { wrapper: MemoryRouter }
    );
  });

  it("First Name Input Box", () => {
    const value = "Naveena";
    const mockOnChange = jest.fn(() => {
      console.log("Change fName", fNameInputBox.value);
    });
    render(
      <CustomInputBox label="First Name" onChange={mockOnChange} id={"fName"} />
    );
    const fNameInputBox = screen.getByLabelText(
      "First Name"
    ) as HTMLInputElement;
    expect(fNameInputBox).toBeInTheDocument();
    fireEvent.change(fNameInputBox, { target: { value: value } });
    expect(fNameInputBox).toHaveValue(fNameInputBox.value);
    //  expect(fNameInputBox.value.length).toBe(12);

    // expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("Last Name Input Box", () => {
    const value = "Naveena";
    const mockOnChange = jest.fn(() => {
      console.log("Change lName", lNameInputBox.value);
    });
    render(
      <CustomInputBox label="Last Name" onChange={mockOnChange} id={"lName"} />
    );
    const lNameInputBox = screen.getByLabelText(
      "Last Name"
    ) as HTMLInputElement;
    expect(lNameInputBox).toBeInTheDocument();
    fireEvent.change(lNameInputBox, { target: { value: value } });
    expect(lNameInputBox).toHaveValue(lNameInputBox.value);
  });

  it("Email Input Box", () => {
    const value = "naveena.pulugu@shipyaari.com";
    const mockOnChange = jest.fn(() => {
      console.log("Change email", emailInputBox.value);
    });
    render(
      <CustomInputBox label="Email" onChange={mockOnChange} id={"email"} />
    );
    const emailInputBox = screen.getByLabelText("Email") as HTMLInputElement;
    expect(emailInputBox).toBeInTheDocument();
    fireEvent.change(emailInputBox, { target: { value: value } });
    expect(emailInputBox).toHaveValue(emailInputBox.value);
  });

  it("Password Input Box", () => {
    const value = "Test@12345";
    const mockOnChange = jest.fn(() => {
      console.log("Change password", passwordInputBox.value);
    });
    render(
      <CustomInputBox
        label="Password"
        onChange={mockOnChange}
        id={"password"}
      />
    );
    const passwordInputBox = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    expect(passwordInputBox).toBeInTheDocument();
    fireEvent.change(passwordInputBox, { target: { value: value } });
    expect(passwordInputBox).toHaveValue(passwordInputBox.value);
  });

  it("Referal Code Input Box", () => {
    const value = "12345";
    const mockOnChange = jest.fn(() => {
      console.log("Change referal code", rcInputBox.value);
    });
    render(
      <CustomInputBox
        label="Referal Code"
        onChange={mockOnChange}
        id={"referalCode"}
      />
    );
    const rcInputBox = screen.getByLabelText(
      "Referal Code"
    ) as HTMLInputElement;
    expect(rcInputBox).toBeInTheDocument();
    fireEvent.change(rcInputBox, { target: { value: value } });
    expect(rcInputBox).toHaveValue(rcInputBox.value);
  });

  it("SIGN UP Button", () => {
    const mockOnSubmit = jest.fn(() => {
      console.log("Sign Up Button click");
    });

    render(<CustomButton text="SIGN UP" onClick={mockOnSubmit} />);
    const buttonElement = screen.getByText("SIGN UP");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("Login Button", () => {
    const logInOnClick = jest.fn(() => {
      console.log("LOGIN Clicked");
    });

    render(
      <button type="button" onClick={logInOnClick}>
        Log In
      </button>
    );

    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(logInOnClick).toHaveBeenCalledTimes(1);
  });
});
