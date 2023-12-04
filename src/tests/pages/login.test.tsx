import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Login from "../../screens/Auth/LogIn/index";
// jest.mock("../../../utils/webService", () => ({
//   ...jest.requireActual("../../../utils/webService"),
//   POST: jest.fn(),
//   GET: jest.fn(),
//   // ... Add other functions you want to mock
// }));

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useDispatch: jest.fn(),
// }));

// jest.mock("react-toastify", () => ({
//   toast: {
//     error: jest.fn(),
//   },
// }));

// jest.mock("../../../Socket", () => ({
//   socketCallbacks: {
//     connectSocket: jest.fn(),
//   },
// }));

// describe("Index Component", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it("renders correctly", async () => {
//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
//     expect(screen.getByText("Welcome to Shipyaari")).toBeInTheDocument();
//   });

//   it("handles login correctly", async () => {
//     const mockApiResponse = {
//       success: true,
//       data: [
//         {
//           nextStep: {
//             kyc: true,
//             qna: true,
//           },
//           name: "John Doe",
//           sellerId: "123",
//           token: "mocked-token",
//         },
//       ],
//     };

//     jest.spyOn(window, "fetch").mockResolvedValueOnce({
//       json: async () => mockApiResponse,
//       ok: true,
//     } as Response);

//     render(
//       <MemoryRouter>
//         <Login />
//       </MemoryRouter>
//     );

//     // Simulate user interaction (e.g., clicking the login button)
//     userEvent.click(screen.getByText("LOG IN"));

//     await waitFor(() => {
//       expect(window.fetch).toHaveBeenCalledWith(
//         expect.stringContaining("/sign-in"),
//         expect.anything()
//       );
//       expect(window.fetch).toHaveBeenCalledTimes(1);
//       expect(screen.getByText("Welcome to Shipyaari")).toBeInTheDocument(); // Adjust this based on your actual behavior
//     });
//   });
// });

describe("Index component tests", () => {
  it("Renders correctly initial document", () => {
    render(<Login />);
    console.log("Login", Login);
    const googleLoginButton = screen.getByRole("button", {
      name: /google login/i,
    });
    fireEvent.click(googleLoginButton);
  });
});
