// app.test.tsx
import React from "react";
import { render } from "@testing-library/react";
import App from "../../App";

// Mock dependencies or setup necessary mocks if required
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Mock the GoogleOAuthProvider component
jest.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the modal component
jest.mock("../../components/CustomModal/customCenterModal.tsx", () => ({
  CenterModal: jest.fn(({ children }) => <div>{children}</div>),
}));

// Mock the CheckIsOnline component
jest.mock("../../components/CheckIsOnline", () => ({
  CheckIsOnline: jest.fn(() => <div data-testid="check-is-online-mock" />),
}));

describe("App Component", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});
