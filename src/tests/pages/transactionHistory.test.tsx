// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { Transaction } from "../../screens/Transaction/index";
import { TransactionSearchBox } from "../../components/Transactions/TransactionSearchBox";
import { PassbookHistory } from "../../screens/Transaction/history/passbookHistory";
import { useErrorBoundary } from "react-error-boundary";

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// const useErrorBoundary=jest.fn();

jest.mock("react-error-boundary", () => ({
  ...jest.requireActual("react-error-boundary"),
  useErrorBoundary: jest.fn(),
  showBoundary: jest.fn(),
}));

describe("Transaction History", () => {
  it("Rendering Transacion without crash", () => {
    render(<Transaction />, { wrapper: MemoryRouter });
    // screen.debug();
  });

  it("Rendering Transaction Search Box", () => {
    const value = "search";

    const mockHandleSearch = jest.fn(() => {});

    render(
      <TransactionSearchBox
        customPlaceholder="Search By Transaction Id"
        onChange={mockHandleSearch}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      "Search By Transaction Id"
    );
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: value } });
    expect(inputElement).toHaveValue(value);

    // expect(mockHandleSearch).toHaveBeenCalledWith("test search");
  });

  it("Rendering Passbook History Component", () => {
    render(<PassbookHistory />, { wrapper: MemoryRouter });
  });
});
