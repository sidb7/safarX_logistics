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
import { GSTComponent } from "../../screens/Onboarding/Kyc/TermsAndAgreement/gstComponent";
import { mobileRegex } from "../../utils/regexCheck";
import "@testing-library/jest-dom";
import Checkbox from "../../components/CheckBox";
afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
describe("GstAggreement Component", () => {
  //rendering the component
  it("renders without crashing", () => {
    // Render the component
    render(
      <Router>
        <GSTComponent />
      </Router>
    );
  });
  //rendering the checkbox
  it("Checkbox is present and selected", async () => {
    const { getByRole } = render(<Checkbox />);
    // Replace 'checkbox' with the correct accessible name or role of your checkbox
    const checkbox = getByRole("checkbox");
    // Assert that the checkbox is present
    expect(checkbox).toBeInTheDocument();
    // Assert that the checkbox is not selected initially
    expect(checkbox.checked).toBe(false);
    //consoling the default value
    console.log("defaultValue", checkbox.checked);
    //setting the value on checking of the checkbox
    fireEvent.change(checkbox, { target: { value: "true" } });
    console.log("checkboxvalue", checkbox.value);
  });
});
