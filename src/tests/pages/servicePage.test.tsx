import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Index from "../../screens/NewOrder/Service";
import "@testing-library/jest-dom";

// jest.mock("../../utils/webService", () => ({
//   POST: jest.fn(),
// }));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Service Component", () => {
  it("renders the component", async () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByAltText("Truck Icon")).toBeInTheDocument();
    });
  });

  it("handles filter click", async () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // userEvent.click(screen.getByText("Filter by"));

    // expect(screen.getByText("All")).toBeInTheDocument();
  });

  //   it("handles dropdown open/close", async () => {
  //     render(
  //       <MemoryRouter>
  //         <Index />
  //       </MemoryRouter>
  //     );

  //     userEvent.click(screen.getByText("View All Services"));

  //     await waitFor(() => {
  //       expect(screen.getByText("Service Option 1")).toBeInTheDocument();
  //     });

  //     userEvent.click(screen.getByAltText("Downarrow"));

  //     await waitFor(() => {
  //       expect(screen.queryByText("Service Option 1")).toBeNull();
  //     });
  //   });
});
