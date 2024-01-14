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
import ClientTracking from "../../screens/NewOrder/Tracking/clientTracking";
import { wait } from "@testing-library/user-event/dist/types/utils";
import "@testing-library/jest-dom";
import CustomButton from "../../components/Button";
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
describe("Tracking Component", () => {
  //checking with rendering of the component
  it("renders without crashing", () => {
    render(<ClientTracking />, { wrapper: MemoryRouter });
    console.log("test is started");
  });
  //checking the input box
  it("rendering the input box", () => {
    render(<ClientTracking />, { wrapper: MemoryRouter });
    const trackingLabel = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    expect(trackingLabel).toBeInTheDocument();
  });
  //updating the state
  it("updates state on input change", async () => {
    render(<ClientTracking />);
    screen.debug();
    const trackingElement = screen.getByRole("textbox", {
      inputMode: "numeric",
    });
    // Clear the existing value
    userEvent.clear(trackingElement);
    // Simulate a change event on the input field
    userEvent.type(trackingElement, "58135101080");
    // Assert that the component state is updated correctly
    await waitFor(() => {
      console.log("trackingValue", trackingElement.value);
      expect(trackingElement.value).toBe("58135101080");
    });
  });
  //getting the customButton and checking
  it("rendering the custom button", () => {
    const { getByText } = render(
      <CustomButton text="Track Order" onClick={() => {}} />
    );
    const buttonElement = getByText("Track Order");
    expect(buttonElement).toBeInTheDocument();
  });
  //checking whether is button got clicked
  it("calls the onClick function when clicked", () => {
    const mockOnClick = jest.fn(() => {
      console.log("checked for clicking");
    });
    const { getByText } = render(
      <CustomButton text="Track Order" onClick={mockOnClick} />
    );
    const buttonElement = getByText("Track Order");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
