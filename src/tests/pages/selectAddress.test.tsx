// @ts-nocheck
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
  getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import SelectAddress from "../../screens/Onboarding/Kyc/SelectAddress/index";
import "@testing-library/jest-dom";
import ServiceButton from "../../components/Button/ServiceButton";
import Card from "../../screens/Onboarding/Kyc/SelectAddress/card";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Select Address Component", () => {
  //rendering component
  it("rendering without crashing", () => {
    render(
      <Router>
        <SelectAddress />
      </Router>
    );
  });
  //checking the add address
  it("checking the add address", () => {
    const { getByText } = render(
      <Router>
        <SelectAddress />
      </Router>
    );
    const addressText = getByText("ADD ADDRESS");
    expect(addressText).toBeInTheDocument();
  });
  //checking for the card render
  it("checking for the card", () => {
    const { getCard } = render(<Card name="address" />);
  });
  //checking the onclick functionality of add address
  it("checking with the onclick functionality", () => {
    const { getByText } = render(
      <Router>
        <SelectAddress />
      </Router>
    );
    const textElement = getByText("ADD ADDRESS");
    expect(textElement).toBeInTheDocument();
    fireEvent.click(textElement);
  });
  //checking the input box
  it("checking the input box", async () => {
    const { getByText } = render(
      <Router>
        <SelectAddress />
      </Router>
    );
    const brandLabel = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    userEvent.clear(brandLabel);
    userEvent.type(brandLabel, "");
    await waitFor(() => {
      console.log("brandLabel", brandLabel.value);
      expect(brandLabel.value).toBe("");
    });
  });
  //getting the customButton and checking
  it("renders with the button rendering", () => {
    const { getByText } = render(
      <ServiceButton text="SUBMIT" onClick={() => {}} />
    );
    const buttonElement = getByText("SUBMIT");
    expect(buttonElement).toBeInTheDocument();
  });
  //checking whether is button got clicked
  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn(() => {
      console.log("checked for clicking");
    });
    const { getByText } = render(
      <ServiceButton text="SUBMIT" onClick={mockOnClick} />
    );
    const buttonElement = getByText("SUBMIT");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
