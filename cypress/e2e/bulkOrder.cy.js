import "cypress-wait-until";

describe("Login and Order Pickup Tests", () => {
  beforeEach("should successfully create an order with pickup details", () => {
    // Handle uncaught exceptions
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });

    cy.intercept("POST", "/auth/login").as("loginRequest");

    cy.clearLocalStorage();
    cy.clearCookie("session_id");

    cy.visit("https://sysellerdev.yaarilabs.com/auth/login");

    cy.title().should("include", "Shipyaari");

    // Enter login credentials
    cy.get("#email").should("be.visible").type("rachanam559@gmail.com");
    cy.get("#password").type("Rachana@123");

    cy.contains("Log In").click();

    cy.url().should("include", "/overview");
  });
  it("Create a B2c Bulk Order", () => {
    // Visit the order pickup page

    cy.visit("https://sysellerdev.yaarilabs.com/orders/add-bulk");

    // Wait for the page to load properly
    cy.waitUntil(() => cy.get("//*[@title='Checkbox']").should("be.visible"), {
      timeout: 10000, // 10 seconds timeout
      interval: 500, // Check every 0.5 seconds
    });
    cy.xpath("//*[@title='Checkbox']").click();
  });
});
