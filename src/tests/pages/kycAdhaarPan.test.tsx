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
import KycSendOtpFormScreen from "../../screens/Onboarding/Kyc/SendOtpForm";
import "@testing-library/jest-dom";
import { panRegex } from "../../utils/regexCheck";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
describe("Kyc Adhaar Pan Form Component", () => {
  //rendering the component
  it("rendering without crashing", () => {
    render(
      <Router>
        <KycSendOtpFormScreen />
      </Router>
    );
  });
  it("rendering the input box", async () => {
    render(<KycSendOtpFormScreen />, { wrapper: Router });
    const panInput = screen.getByLabelText("PAN Number");
    console.log("pannumber", panInput.value);
    expect(panInput).toBeInTheDocument();
    userEvent.type(panInput, "EPHPP9802K");
    const validate = panRegex.test(panInput);
    await waitFor(() => {
      console.log("pannumber123", panInput.value);
    });
  });
});
