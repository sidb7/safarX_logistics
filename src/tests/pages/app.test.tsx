import React from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import App from "../../App";
import "@testing-library/jest-dom";

beforeAll(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
});

jest.mock("react-dom/client", () => ({
  createRoot: jest.fn().mockReturnThis(),
  render: jest.fn(),
}));

jest.mock("../../redux/store", () => ({
  store: {
    // mock your store methods or use a mock store library
    // For simplicity, you can use a simple object as a mock store
    getState: jest.fn(),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

jest.mock("@react-oauth/google", () => ({
  GoogleOAuthProvider: jest.fn(({ children }) => <>{children}</>),
}));

describe("App", () => {
  it("renders without crashing", () => {
    act(() => {
      require("../../index");
    });

    expect(GoogleOAuthProvider).toHaveBeenCalledWith({
      clientId:
        "249738064376-5tk2o7mfpots3fc4i0uvq4793iiii78k.apps.googleusercontent.com",
    });
    expect(render).toHaveBeenCalledWith(
      <GoogleOAuthProvider clientId="249738064376-5tk2o7mfpots3fc4i0uvq4793iiii78k.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>,
      expect.anything()
    );
  });
});
