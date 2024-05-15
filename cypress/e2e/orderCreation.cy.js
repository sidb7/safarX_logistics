import "cypress-wait-until";

describe("Login and Order Pickup Tests", () => {
  beforeEach("should successfully create an order with pickup details", () => {
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

    // Enter login credentials
    cy.get("#email")
      .should("be.visible")
      .type("rachana.muneshwar@shipyaari.com");
    cy.get("#password").type("Rachana@123");

    // Click on the Log In button and wait for the login request to complete
    cy.contains("Log In").click();

    // Wait for the login request to complete
    //cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

    // Verify the URL after successful login
    cy.url().should("include", "/overview");
  });

  it("should successfully create an order with pickup details", () => {
    // Visit the order pickup page

    cy.visit("https://sysellerdev.yaarilabs.com/orders/add-order/pickup");

    // Wait for the page to load properly
    cy.waitUntil(() => cy.get("#address-checkbox").should("be.visible"), {
      timeout: 10000, // 10 seconds timeout
      interval: 500, // Check every 0.5 seconds
    });

    // Fill in pickup details
    cy.get("#address-checkbox").click();
    cy.get('img[alt="Arrow"]').click();

    cy.waitUntil(() => cy.get('img[alt="Arrow"]').should("be.visible"));

    // Fill in contact person details

    cy.waitUntil(() => cy.get('input[placeholder="Pickup Date"]').click());
    cy.get('button:contains("Tomorrow")').click();
    cy.get('button:contains("12:00 PM - 03:00 PM")').click();

    // Save and process
    cy.contains("button", "Save").click();
    cy.contains("button", "Next").click();
    cy.xpath("//*[text()='Pick-Up Address Info Added']").should("be.visible");

    // Verify URL change
    cy.waitUntil(() => cy.url().should("include", "/delivery"));

    // Fill in delivery details
    cy.get(".magicAddressInput").type(
      "12a, 3rd Floor, Techniplex - Ii, Off Veer Savarkar Flyover, Malad West Mumbai, Maharashtra 400062"
    );
    cy.xpath("//*[@alt='Arrow']").click();

    cy.waitUntil(() =>
      cy
        .xpath("//*[text()='Name of the contact person']//parent::div")
        .type("delivery contact person name")
    );
    cy.xpath("//*[text()='Mobile Number']//parent::div").type("6020553393");
    cy.xpath("//p[text()='Billing Details Is Same As Delivery']")
      .should("be.visible")
      .and("contain", "Billing Details Is Same As Delivery");
    cy.wait(3000);
    cy.waitUntil(() => cy.xpath("//p[text()='Next']")).click();
    cy.xpath(
      "//*[text()='Delivery And Billing Address Added Successfully']"
    ).should("be.visible");

    // Add product details
    cy.wait(4000);
    cy.waitUntil(() =>
      cy.xpath("//p[text()='Add Product To Catalogue']")
    ).click();
    cy.xpath("//label[text()='Product name']//preceding::input").type(
      "crop top"
    );
    cy.get('input[name="category"]').click();
    cy.xpath("//*[@name='category']").type("Media").type("{enter}").click();
    cy.get('input[name="unitPrice"]').type(100);
    cy.get('input[name="length"]').type(14);
    cy.get('input[name="breadth"]').type(10);
    cy.get('input[name="height"]').type(12);
    cy.get('input[name="deadWeight"]').type(0.5);
    cy.get('input[name="sku"]').type("TEST01");

    cy.xpath("//*[text()='Save']").click();
    cy.xpath("//*[text()='Product Created Successfully']").should("be.visible");

    // Add box info

    cy.waitUntil(() => cy.xpath("//*[text()='Add Box To Catalogue']")).click();
    cy.wait(1000);
    cy.waitUntil(() => cy.get('input[name="length"]')).type(14);
    cy.get('input[name="breadth"]').type(10);
    cy.get('input[name="height"]').type(12);
    cy.get('input[name="name"]').type("Boxname");
    cy.get('input[name="color"]').type("color");
    cy.get('input[name="price"]').type(50);
    cy.get('input[name="deadWeight"]').type(0.5);
    cy.contains("p", "Save").click();
    cy.xpath("//*[text()='Seller Box Created SuccessFully']").should(
      "be.visible"
    );

    // Add product to box
    cy.waitUntil(() => cy.get('[alt="ADD PRODUCTS BOX 1"]')).click();

    cy.waitUntil(() => cy.get('input[placeholder="Search Products"]'))
      .type("crop top")
      .click();
    cy.xpath("(//*[text()='Crop Top'])[1]//parent::div").click();

    cy.waitUntil(() =>
      cy.xpath("//*[contains(@class, 'capitalize') and text()='Save']")
    ).click();

    // Select box info
    cy.waitUntil(() =>
      cy.xpath("(//*[@class='flex text-sm']//parent::div)[1]")
    ).click();

    cy.waitUntil(() =>
      cy.xpath("//*[contains(@class, 'capitalize') and text()='Save']")
    ).click();

    cy.waitUntil(() =>
      cy.xpath("//*[contains(@class, 'capitalize') and text()='Next']")
    ).click();

    cy.waitUntil(() => cy.contains("p", "Service")).should("be.visible");

    cy.waitUntil(() => cy.contains("p", "Cheapest").click());
    cy.contains("p", "Next").click();
    cy.wait(5000);
    cy.waitUntil(() => cy.contains("p", "Summary").should("be.visible"));
    cy.contains("p", "Place Order").click();

    // Cancel the shipment
    cy.wait(5000);
    cy.waitUntil(() =>
      cy.xpath("(//*[@alt='moreIcon'])[1]/../parent::div")
    ).click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Are You Sure You Want To Cancel This Order");
      cy.xpath("(//*[@type='submit'])[2]").click();
    });

    // Trigger an action that causes an alert
    cy.waitUntil(() => cy.xpath("(//*[text()= 'Cancel Order'])[1]").click());
    cy.waitUntil(() => cy.xpath("//button[text()='Yes']").click());
    cy.xpath("//*[text()='AWB Cancel Process Started']").should("be.visible");
    cy.wait(5000);
  });

  after(() => {
    // Perform any cleanup or logout if necessary
    cy.xpath(
      "//*[@class='flex p-2 justify-center items-center text-white bg-black rounded-md h-9 w-full bg-white !w-6 !h-6 !p-0 lg:w-fit']"
    ).click();
    cy.xpath("//*[text()='Sign out']").click();
    cy.xpath("//*[text()='Logged Out Successfully.']").should("be.visible");
  });
});
