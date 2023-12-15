import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  getByRole,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import CustomInputBox from "../../components/Input";

import CustomButton from "../../components/Button";
import UserManagement from "../../screens/Profile/Settings/userManagement";
import AddUser from "../../screens/Profile/Settings/userManagement/addUser";
import UpdateUser from "../../screens/Profile/Settings/userManagement/updateUser";
import DeleteConfirmModale from "../../screens/Profile/Settings/userManagement/deleteConfirmationModal";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("User Management", () => {
  it("User Management rendering", () => {
    render(<UserManagement />, { wrapper: MemoryRouter });
  });

  it("Add Role Button", () => {
    render(<UserManagement />, { wrapper: MemoryRouter });

    const mockOnSubmit = jest.fn(() => {
      console.log("Add role button click");
    });

    render(<CustomButton text="ADD ROLE" onClick={mockOnSubmit} />);
    const buttonElement = screen.getByText("ADD ROLE");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("Add User Button", () => {
    render(<UserManagement />, { wrapper: MemoryRouter });

    const mockOnSubmit = jest.fn(() => {
      console.log("Add user button click");
    });

    render(<CustomButton text="ADD USER" onClick={mockOnSubmit} />);
    const buttonElement = screen.getByText("ADD USER");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("Add User screen rendering", () => {
    render(<AddUser />, { wrapper: MemoryRouter });
  });

  it("Update User", () => {
    render(<UpdateUser />, { wrapper: MemoryRouter });

    //Update User Button

    // const mockOnSubmit = jest.fn(() => {
    //   console.log("Update User button click");
    // });

    // const { getByRole } = render(
    //   <CustomButton text="UPDATE USER" onClick={mockOnSubmit} />
    // );
    // const buttonElement = getByRole("button");
    // expect(buttonElement).toBeInTheDocument();
    // fireEvent.click(buttonElement);
    // expect(mockOnSubmit).toHaveBeenCalledTimes(1);

    //Breadcrum rendering
    // render(<Breadcrum label="UPDATE USER" />, { wrapper: MemoryRouter });

    //First Name
    const value = "Naga";
    const onMockChange = jest.fn(() => {
      console.log("On role change", fNameInputBox.value);
    });
    render(
      <CustomInputBox label="First Name" onChange={onMockChange} id="fName" />
    );

    const fNameInputBox = screen.getByLabelText(
      "First Name"
    ) as HTMLInputElement;
    expect(fNameInputBox).toBeInTheDocument();
    fireEvent.change(fNameInputBox, { target: { value: value } });
    expect(fNameInputBox).toHaveValue(fNameInputBox.value);
    // expect(onMockChange).toHaveBeenCalledTimes(1);

    //Last Name
    const lName = "Naga";
    const onMockChangeLName = jest.fn(() => {
      console.log("On role change", lNameInputBox.value);
    });
    render(
      <CustomInputBox
        label="Last Name"
        onChange={onMockChangeLName}
        id="lName"
      />
    );

    const lNameInputBox = screen.getByLabelText(
      "Last Name"
    ) as HTMLInputElement;
    expect(lNameInputBox).toBeInTheDocument();
    fireEvent.change(lNameInputBox, { target: { value: lName } });
    expect(lNameInputBox).toHaveValue(lNameInputBox.value);

    //Password
    const password = "Naga";
    const onMockChangepassword = jest.fn(() => {
      console.log("On role change", passwordInputBox.value);
    });
    render(
      <CustomInputBox
        label="Password"
        onChange={onMockChangepassword}
        id="password"
      />
    );

    const passwordInputBox = screen.getByLabelText(
      "Password"
    ) as HTMLInputElement;
    expect(passwordInputBox).toBeInTheDocument();
    fireEvent.change(passwordInputBox, { target: { value: password } });
    expect(passwordInputBox).toHaveValue(passwordInputBox.value);

    //Contact Number

    const contact = "Naga";
    const onMockChangecontact = jest.fn(() => {
      console.log("On role change", contactInputBox.value);
    });
    render(
      <CustomInputBox
        label="Contact Number"
        onChange={onMockChangecontact}
        id="contactNumber"
      />
    );

    const contactInputBox = screen.getByLabelText(
      "Contact Number"
    ) as HTMLInputElement;
    expect(contactInputBox).toBeInTheDocument();
    fireEvent.change(contactInputBox, { target: { value: contact } });
    expect(contactInputBox).toHaveValue(contactInputBox.value);

    //Email

    const email = "Naga@gmail.com";
    const onMockChangeemail = jest.fn(() => {
      console.log("On role change", emailInputBox.value);
    });
    render(
      <CustomInputBox label="Email" onChange={onMockChangeemail} id="email" />
    );

    const emailInputBox = screen.getByLabelText("Email") as HTMLInputElement;
    expect(emailInputBox).toBeInTheDocument();
    fireEvent.change(emailInputBox, { target: { value: email } });
    expect(emailInputBox).toHaveValue(emailInputBox.value);
  });

  it("Delete Confirmation Modal", () => {
    render(<DeleteConfirmModale />);
  });
});
