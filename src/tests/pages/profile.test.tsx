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

import { Profile } from "../../screens/Profile";
import { ProfileCard } from "../../screens/Profile/ProfileCard/profileCard";
import { ProfileKycCard } from "../../screens/Profile/Kyc/kycCard";
import { ProfileBankCard } from "../../screens/Profile/Bank/bankCard";
import { ProfileNotification } from "../../screens/Profile/Notification/notificationCard";
import { ProfileReferEarn } from "../../screens/Profile/ReferEarn/referEarn";
import { ProfileSetting } from "../../screens/Profile/Settings/setting";
import { EditProfileBank } from "../../screens/Profile/Bank/bankKyc";
import { EditProfileKyc } from "../../screens/Profile/Kyc/editKyc";
import { ProfileNotificationTab } from "../../screens/Profile/Notification/notificationTab";
import { ReferTab } from "../../screens/Profile/ReferEarn/referTab";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Profile test cases", () => {
  it("Rendering Profile Screen", () => {
    render(<Profile />, { wrapper: MemoryRouter });
  });

  it("Profile Card rendering", () => {
    render(<ProfileCard />, { wrapper: MemoryRouter });
  });

  it("Profile Kyc Card rendering", () => {
    render(<ProfileKycCard KycDetails={""} />, { wrapper: MemoryRouter });
  });

  it("Profile Bank Card", () => {
    render(<ProfileBankCard BankDetails={""} />, { wrapper: MemoryRouter });
  });

  it("Edit Profile Bank", () => {
    render(<EditProfileBank />, { wrapper: MemoryRouter });
  });

  //   it("Edit Profile Kyc", () => {
  //     render(<EditProfileKyc />, { wrapper: MemoryRouter });
  //   });

  it("Profile Notification", () => {
    render(<ProfileNotification />, { wrapper: MemoryRouter });
  });

  it("Profile Refer Earn", () => {
    render(<ProfileReferEarn />, { wrapper: MemoryRouter });
  });

  it("Profile Setting rendering", () => {
    render(<ProfileSetting />, { wrapper: MemoryRouter });
  });

  it("Profile Notification Tab", () => {
    render(<ProfileNotificationTab />, { wrapper: MemoryRouter });
  });
  it("Profile Refer Tab", () => {
    render(<ReferTab />, { wrapper: MemoryRouter });
  });
});
