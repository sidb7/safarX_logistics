import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddressCard from "../../screens/NewOrder/NewPickup/PickupAddress/addressCard";
import "@testing-library/jest-dom/extend-expect";

describe("AddressCard component", () => {
  test("renders Magic Address text", () => {
    const data = {
      pickupAddress: {},
      setPickupAddress: jest.fn(),
      addressLabel: "Return Address",
      inputError: false,
      setInputError: jest.fn(),
    };

    render(<AddressCard data={data} />);

    const magicAddressText = screen.getByText(/Magic Address/i);
    expect(magicAddressText).toBeInTheDocument();
  });

  // Add more tests for other functionalities if needed
});
