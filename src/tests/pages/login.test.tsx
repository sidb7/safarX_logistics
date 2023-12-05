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
import LogInScreen from "../../screens/Auth/LogIn";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Login Component", () => {
  it("renders without crashing", () => {
    render(<LogInScreen />, { wrapper: MemoryRouter });
  });

  it("handles user login with valid credentials", async () => {
    render(<LogInScreen />, { wrapper: MemoryRouter });
    console.log("Test start");
    screen.debug();
    await waitForElementToBeRemoved(() => screen.getByAltText("bootscreen"));
    screen.debug();

    // Get the email input again for interaction
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = await screen.getByText("LOG IN");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");

    // Trigger the click event on the login button
    fireEvent.click(loginButton);
  });
});
