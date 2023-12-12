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
import WelcomeHeader from "../../screens/Onboarding/Kyc/welcomeHeader";
import AddButton from "../../components/Button/addButton";
import Card from "../../screens/Onboarding/Kyc/SelectAddress/card";
import ServiceButton from "../../components/Button/ServiceButton";
import SendOtpForm from "../../screens/Onboarding/Kyc/SendOtpForm";
import CustomInputBox from "../../components/Input";
import TimerCounter from "../../components/TimerCountdown";
import { Spinner } from "../../components/Spinner";
import WalletMain from "../../screens/Onboarding/WalletRecharge/walletMain";
import Checkbox from "../../components/CheckBox";
import CustomButton from "../../components/Button";
import WalletPayment from "../../screens/Onboarding/WalletRecharge/walletPayment";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Wallet Payment", () => {
  it("Rendering Wallet Payment Screen", () => {
    render(<WalletPayment />, { wrapper: MemoryRouter });
  });
});
