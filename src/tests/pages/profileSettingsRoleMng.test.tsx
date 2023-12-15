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
import RoleManagement from "../../screens/Profile/Settings/roleManagement/roleManagement";
import UpdateRole from "../../screens/Profile/Settings/roleManagement/updateRole";
import UsersList from "../../screens/Profile/Settings/roleManagement/usersList";
import DeleteConfirmModale from "../../screens/Profile/Settings/roleManagement/deleteConfirmatiomModal";
import { Breadcrum } from "../../components/Layout/breadcrum";
import ReusableAccordian from "../../components/CustomAccordian/reusableAccordion";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Role Management", () => {
  it("Role Management screen rendering", () => {
    render(<RoleManagement />, { wrapper: MemoryRouter });
  });

  it("Add User Button", () => {
    render(<RoleManagement />, { wrapper: MemoryRouter });

    const mockOnSubmit = jest.fn(() => {
      console.log("Add user button click");
    });

    render(<ServiceButton text="ADD USER" onClick={mockOnSubmit} />);
    const buttonElement = screen.getByText("ADD USER");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("Add Role Button", () => {
    render(<RoleManagement />, { wrapper: MemoryRouter });

    const mockOnSubmit = jest.fn(() => {
      console.log("Add role button click");
    });

    render(<ServiceButton text="ADD ROLE" onClick={mockOnSubmit} />);
    const buttonElement = screen.getByText("ADD ROLE");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it("Update Role rendering", () => {
    render(<UpdateRole />, { wrapper: MemoryRouter });

    //Reusable Accordian
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

  it("Users List rendering", () => {
    render(<UsersList />, { wrapper: MemoryRouter });
  });

  it("Delete Modal rendering", () => {
    render(<DeleteConfirmModale />, { wrapper: MemoryRouter });
  });

  it("Breadcrum rendering", () => {
    render(<Breadcrum label="Role Management" />, { wrapper: MemoryRouter });
  });
});
