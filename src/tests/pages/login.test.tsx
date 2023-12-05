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
import { wait } from "@testing-library/user-event/dist/types/utils";

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

describe("Login Component", () => {
  it("renders without crashing", () => {
    render(<LogInScreen />, { wrapper: MemoryRouter });
  });

  it("handles user login with valid credentials", async () => {
    render(<LogInScreen />, { wrapper: MemoryRouter });
    console.log("Test start");

    // Wait for the LogInScreen component to be fully rendered
    const emailInput = await screen.findByRole("textbox", { name: /email/i });

    screen.debug();
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("LOG IN");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");

    // Trigger the click event on the login button
    fireEvent.click(loginButton);
  });
});
