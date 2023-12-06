import { render, screen } from "@testing-library/react";
import PickupLocation from "../../screens/NewOrder/NewPickup";

describe("PickupLocation", () => {
  test("renders Add New Order label", () => {
    render(<PickupLocation />);
    const linkElement = screen.getByText(/Add New Order/i);
    expect(linkElement).toBeInTheDocument();
  });
});
