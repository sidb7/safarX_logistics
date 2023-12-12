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

import "@testing-library/jest-dom";

import CustomButton from "../../components/Button";
import WelcomeHeader from "../../screens/Onboarding/Kyc/welcomeHeader";
import { WelcomeKyc } from "../../screens/Onboarding/Questionnaire/welcomeKyc";
import Checkbox from "../../components/CheckBox";

describe("KYC Welcome", () => {
  it("KYC Welcome screen rendering", () => {
    render(<WelcomeKyc />, { wrapper: MemoryRouter });
  });

  it("Welcome Header rendering", () => {
    render(<WelcomeHeader />, { wrapper: MemoryRouter });
  });

  it("Proceed for KYC Button", () => {
    const onMockClick = jest.fn(() => {
      console.log("On KYC Button Click");
    });

    render(<CustomButton text="PROCEED FOR KYC" onClick={onMockClick} />, {
      wrapper: MemoryRouter,
    });

    const buttonElement = screen.getByText("PROCEED FOR KYC");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
  });

  it("Skip for now button", () => {
    const onMockClick = jest.fn(() => {
      console.log("On Skip For Now Click");
    });

    render(
      <div
        className="flex justify-center text-[#004EFF] text-sm underline underline-offset-4	decoration-[#004EFF] mt-4 cursor-pointer"
        onClick={onMockClick}
      >
        SKIP FOR NOW
      </div>,
      {
        wrapper: MemoryRouter,
      }
    );

    const divElement = screen.getByText("SKIP FOR NOW");
    expect(divElement).toBeInTheDocument();
    fireEvent.click(divElement);
  });

  //   it("Checkbox", () => {
  //     const mockOnChange = jest.fn(() => {
  //       console.log("Click Checkbox");
  //     });

  //     render(
  //       <Checkbox
  //         checked={true}
  //         onChange={mockOnChange}
  //         label="Faster COD pay-outs"
  //       />,
  //       {
  //         wrapper: MemoryRouter,
  //       }
  //     );

  //     const cb1 = screen.getByLabelText("Faster COD pay-outs");
  //     expect(cb1).toBeInTheDocument();
  //   });

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
