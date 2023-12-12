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
import "@testing-library/jest-dom";
import KycModalScreen from "../../screens/Onboarding/Kyc/TermsAndAgreement/Modal";
import ServiceButton from "../../components/Button/ServiceButton";
afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Congratulations Component", () => {
  //rendering component
  it("rendering without crashing", () => {
    //render the component
    render(
      <Router>
        <KycModalScreen />
      </Router>
    );
  });
  //rendering the checkbox
  it("renders with the correct text", () => {
    const { getByText } = render(
      <ServiceButton text="NEXT" onClick={() => {}} />
    );
    const buttonElement = getByText("NEXT");
    expect(buttonElement).toBeInTheDocument();
  });
  //checking whether is button got clicked
  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn(() => {
      console.log("checking for the congratulations modal");
    });
    const { getByText } = render(
      <ServiceButton text="NEXT" onClick={mockOnClick} />
    );
    const buttonElement = getByText("NEXT");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
