import { getValue } from "../support/redis";
import {
  cancelOrder,
  createOrderWithPickupDetails,
} from "../support/ orderCreationUtils";
import { Login } from "../support/ orderCreationUtils";
import { addDeliveryAddress } from "../support/ orderCreationUtils";
import { addProductDetails } from "../support/ orderCreationUtils";
import { addBoxInfo } from "../support/ orderCreationUtils";
import { addProducttoBox } from "../support/ orderCreationUtils";
import { SelectBoxInfo } from "../support/ orderCreationUtils";
import { selectforwordservices } from "../support/ orderCreationUtils";
import { selectReverseServiceOption } from "../support/ orderCreationUtils";
import { selectReverseOption } from "../support/ orderCreationUtils";
import { AddPickupAddress } from "../support/ orderCreationUtils";
import { newlyOnboard } from "../support/Onboarding";
import { MobileOtpCreation } from "../support/Onboarding";
import { Questionnaire } from "../support/Onboarding";
import { KYC } from "../support/Onboarding";
import { BankDetails } from "../support/Onboarding";

describe("Sign up", () => {
  beforeEach("Seller Can SignUp Successfully", () => {
    // Handle uncaught exceptions
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    // Intercept login request
    cy.intercept("POST", "/auth/login").as("loginRequest");

    // Clear local storage and cookies
    cy.clearLocalStorage();
    cy.clearCookie("session_id");

    // Visit the login page
    cy.visit("https://sysellerdev.yaarilabs.com/auth/login");

    // Verify the title of the page
    cy.title().should("include", "Shipyaari");
  });

  it(" Newly Onboarding process", () => {
    newlyOnboard();
    MobileOtpCreation();
    Questionnaire();
    KYC();
    BankDetails();
  });

  it("forword order creation", () => {
    cy.wait(5000);
    Login();
    AddPickupAddress();
    createOrderWithPickupDetails();
    addDeliveryAddress();
    addProductDetails();
    addBoxInfo();
    addProducttoBox();
    SelectBoxInfo();
    selectforwordservices();
    cancelOrder();

    // p[text()='SKIP FOR NOW']
    // cy.wait(5000);
  });

  it("reverse ordercreation", () => {
    cy.wait(5000);
    Login();
    AddPickupAddress();
    selectReverseOption();
    addDeliveryAddress();
    addProductDetails();
    addBoxInfo();
    addProducttoBox();
    SelectBoxInfo();
    selectReverseServiceOption();
    cancelOrder();
  });

  after(() => {
    cy.request({
      method: "POST",
      url: "https://sysellerconsoledev.yaarilabs.com/api/v1/seller/deleteSingleSellerForTest",
      body: {
        email: "tech@shipyaari.com",
      },
    }).then((response) => {
      // Ensure the response status is 200
      expect(response.status).to.eq(200);
    });
  });
});
