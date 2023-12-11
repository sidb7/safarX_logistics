import React from "react";
import ReactDOM from "react-dom/client";

import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { MemoryRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import PlanDetails from "../../screens/Plan/planDetails";
import PlanDetailsCard from "../../screens/Plan/planDetailsCard";
import CourierPricing from "../../screens/Plan/courierPricing";
import ServiceButton from "../../components/Button/ServiceButton";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../../utils/webService", () => ({
  GET: jest.fn().mockResolvedValue({ data: { success: true } }),
}));

jest.mock("../../utils/webService", () => ({
  POST: jest.fn().mockResolvedValue({ data: { success: true } }),
}));

// let container: any;

// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   document.body.removeChild(container);
//   container = null;
// });

describe("Testing Plan Details", () => {
  it("Rendering PlanDetails without crash", async () => {
    render(<PlanDetails />, { wrapper: MemoryRouter });
  });

  it("Rendering PlanDetails card", () => {
    render(<PlanDetailsCard planDetails="" />, { wrapper: MemoryRouter });
  });

  it("Rendering Courier Pricing", () => {
    render(<CourierPricing />, { wrapper: MemoryRouter });
  });

  it("Talk to our support button testing", () => {
    //onClick
    const mockOnClick = jest.fn(() => {
      console.log("checked for clicking");
    });

    //Render Button with props

    render(<ServiceButton text="TALK TO OUR SUPPORT" onClick={mockOnClick} />);

    //Button Test Cases
    const buttonElement = screen.getByText("TALK TO OUR SUPPORT");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
