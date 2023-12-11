// @ts-nocheck
import React from "react";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import KycBusinessTypeScreen from "../../screens/Onboarding/Kyc/BusinessType";
import Card from "../../screens/Onboarding/Kyc/BusinessType/card";
// import CustomRadioButton from "../../../../components/RadioButton/Index";
import "@testing-library/jest-dom";

afterEach(cleanup);
// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("test cases for the kyc type screen", () => {
  it("the following component of the screen renders without crashing", () => {
    render(
      <Router>
        <KycBusinessTypeScreen />
      </Router>
    );
  });
});
