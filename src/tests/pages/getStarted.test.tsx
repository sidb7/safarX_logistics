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
import GetStartedScreen from "../../screens/Onboarding/Signup/getStarted";
import "@testing-library/jest-dom";
import Checkbox from "../../components/CheckBox";
import CustomButton from "../../components/Button/index";
afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("GetStarted Component", () => {
  //checking with rendering of the component
  it("renders without crashing", () => {
    render(
      <Router>
        <GetStartedScreen />
      </Router>
    );
  });
  // it("rendering the custom button", () => {
  //   const { getByText } = render(
  //     <CustomButton text="SET UP MY ACCOUNT" onClick={() => {}} />
  //   );
  //   const buttonElement = getByText("SET UP MY ACCOUNT");
  //   expect(buttonElement).toBeInTheDocument();
  // });
  //checking whether is button got clicked
  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn(() => {
      console.log("checked for setting up the account");
    });
    const { getByText } = render(
      <CustomButton text="SET UP MY ACCOUNT" onClick={mockOnClick} />
    );
    const buttonElement = getByText("SET UP MY ACCOUNT");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
