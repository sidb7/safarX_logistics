import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { ProfileSetting } from "../../screens/Profile/Settings/setting";
import { ChangePassword } from "../../screens/Profile/Settings/changePassword";
import RoleManagement from "../../screens/Profile/Settings/roleManagement/roleManagement";
import UserManagement from "../../screens/Profile/Settings/userManagement";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Profile Settings", () => {
  it("Rendering Profile Settings", () => {
    render(<ProfileSetting />, { wrapper: MemoryRouter });
  });

  it("Change Password Screen rendering", () => {
    render(<ChangePassword />, { wrapper: MemoryRouter });
  });

  it("Role Management rendering", () => {
    render(<RoleManagement />, { wrapper: MemoryRouter });
  });

  it("User Managementrendering", () => {
    render(<UserManagement />, { wrapper: MemoryRouter });
  });
});
