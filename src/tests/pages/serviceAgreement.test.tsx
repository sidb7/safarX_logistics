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
import { ServiceComponent } from "../../screens/Onboarding/Kyc/TermsAndAgreement/index";
import "@testing-library/jest-dom";
import Checkbox from "../../components/CheckBox";
afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
describe("ServiceAggreement Component", () => {
  //rendering the component
  it("renders without crashing", () => {
    //render the component
    render(
      <Router>
        <ServiceComponent />
      </Router>
    );
  });
  //rendering the checkbox
  it("checkbox is present and selected", async () => {
    //rendering the checkbox
    const { getByRole } = render(<Checkbox />);
    const checkbox = getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    //consoling the default value
    console.log("defaultvalue", checkbox.checked);
    expect(checkbox.checked).toBe(false);
    //setting the value on checking of the checkbox
    fireEvent.change(checkbox, { target: { value: "true" } });
    console.log("checkboxvalue", checkbox.value);
  });
});
