import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ServiceButton from "../../components/Button/ServiceButton";
import CustomInputBox from "../../components/Input";
import AddRole from "../../screens/Profile/Settings/roleManagement/addRole";
import ReusableAccordian from "../../components/CustomAccordian/reusableAccordion";
import { Breadcrum } from "../../components/Layout/breadcrum";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Add Role", () => {
  it("Add Role screen rendering", () => {
    render(<AddRole />, { wrapper: MemoryRouter });
  });

  it("Reusable Accordian rendering", () => {
    render(
      <ReusableAccordian
        menuData={[]}
        setMenuData={() => {}}
        handle_Level_1_Menu={[]}
        handle_Level_2_Pages={[]}
        handle_Level_3_Pages={[]}
        handle_Level_3_Menu_Pages={[]}
        handle_Level_3_Menu_All_Pages={[]}
        handle_Level_3_Single_Page_Check={[]}
        handle_Level_3_Single_Menu_Page_Check={[]}
      />,
      { wrapper: MemoryRouter }
    );
  });

  it("Breadcrum rendering", () => {
    render(<Breadcrum label="Add Role" />, { wrapper: MemoryRouter });
  });

  it("Role Input Box", () => {
    const value = "Naga";

    const onMockChange = jest.fn(() => {
      console.log("On role change", roleInputBox.value);
    });

    render(
      <CustomInputBox
        label="Enter Role Name"
        onChange={onMockChange}
        id="roleName"
      />,
      {
        wrapper: MemoryRouter,
      }
    );

    const roleInputBox = screen.getByLabelText(
      "Enter Role Name"
    ) as HTMLInputElement;
    expect(roleInputBox).toBeInTheDocument();
    fireEvent.change(roleInputBox, { target: { value: value } });
    expect(roleInputBox).toHaveValue(roleInputBox.value);
  });

  it("Add Role Button", () => {
    const mockOnSubmit = jest.fn(() => {
      console.log("Add role button click");
    });

    render(<ServiceButton text="ADD ROLE" onClick={mockOnSubmit} />);
    const buttonElement = screen.getByText("ADD ROLE");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
