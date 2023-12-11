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

afterEach(cleanup);

// Mocking the redux functions
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("Transaction History", () => {
  it("Rendering Transacion without crash", () => {
    render(<Transaction />, { wrapper: MemoryRouter });
  });

  it("Rendering Transaction Search Box", () => {
    const mockHandleSearch = jest.fn(() => {});

    const { getByPlaceholderText } = render(
      <TransactionSearchBox
        customPlaceholder="Search By Transaction Id"
        onChange={mockHandleSearch}
      />
    );

    const inputElement = getByPlaceholderText("Search By Transaction Id");

    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "test search" } });
    expect(inputElement).toHaveValue("test search");

    // expect(mockHandleSearch).toHaveBeenCalledWith("test search");
  });
});
