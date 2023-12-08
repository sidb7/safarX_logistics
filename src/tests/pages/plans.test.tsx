import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import PlansScreen from "../../screens/Plan/index";
import PlanCard from "../../screens/Plan/planCard";
import ComparePlans from "../../screens/Plan/comparePlans";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// jest.mock("../../utils/webService", () => ({
//   POST: jest.fn().mockResolvedValue({ data: { success: true } }),
// }));

jest.mock("../../utils/webService", () => ({
  GET: jest.fn().mockResolvedValue({ data: { success: true } }),
}));

describe("Testing Plans", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Rendering Plans without crashing", async () => {
    render(<PlansScreen />, { wrapper: MemoryRouter });

    //U have to mock for mobile responsiveness

    // const compareButton = screen.getByText("COMPARE");
    // expect(compareButton).toBeInTheDocument();
    // fireEvent.click(compareButton);
  });

  it("Plans Card rendering", async () => {
    render(
      <PlanCard
        planName=""
        price=""
        description=""
        validity=""
        onClick={() => {}}
        activePlanId=""
        isSelected={true}
        planId=""
      />,
      { wrapper: MemoryRouter }
    );

    const selectedButton = screen.getByText(/SELECT(ED)?/i);
    expect(selectedButton).toBeInTheDocument();
    fireEvent.click(selectedButton);
  });

  it("Compare Plans rendering", async () => {
    render(<ComparePlans />, { wrapper: MemoryRouter });
  });
});
