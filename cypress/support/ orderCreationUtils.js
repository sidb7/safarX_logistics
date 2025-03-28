import "cypress-wait-until";

export function createOrderWithPickupDetails() {
  cy.visit("https://sysellerdev.yaarilabs.com/orders/add-order/pickup");

  // Wait for the page to load properly
  cy.waitUntil(() => cy.get("#address-checkbox").should("be.visible"), {
    timeout: 10000, // 10 seconds timeout
    interval: 500, // Check every 0.5 seconds
  });

  // Fill in pickup details
  cy.wait(2000);
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
}
// Verify URL change

export function addDeliveryAddress() {
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
}

// Add product details
export function addProductDetails() {
  cy.wait(4000);
  cy.waitUntil(() =>
    cy.xpath("//p[text()='Add Product To Catalogue']")
  ).click();
  cy.xpath("//label[text()='Product name']//preceding::input").type(
    "boatneck top"
  );
  let twoDigitNo = Math.floor(Math.random() * 9) + 1;
  cy.log("mobileNumber" + `${twoDigitNo}`);
  cy.get('input[name="category"]').click();
  cy.xpath("//*[@name='category']").type("Media").type("{enter}").click();
  cy.get('input[name="unitPrice"]').type(twoDigitNo);
  cy.get('input[name="length"]').type(twoDigitNo);
  cy.get('input[name="breadth"]').type(twoDigitNo);
  cy.get('input[name="height"]').type(twoDigitNo);
  cy.get('input[name="deadWeight"]').type(0.5);
  cy.get('input[name="sku"]').type("TEST01");

  cy.xpath("//*[text()='Save']").click();
  cy.xpath("//*[text()='Product Created Successfully']").should("be.visible");
  cy.wait(2000);
}

// Add box info
export function addBoxInfo() {
  let twoDigitNo = Math.floor(Math.random() * 9) + 1;
  cy.log("mobileNumber" + `${twoDigitNo}`);
  cy.waitUntil(() => cy.xpath("//*[text()='Add Box To Catalogue']")).click();
  cy.wait(1000);
  cy.waitUntil(() => cy.get('input[name="length"]')).type(twoDigitNo);
  cy.get('input[name="breadth"]').type(twoDigitNo);
  cy.get('input[name="height"]').type(twoDigitNo);
  cy.get('input[name="name"]').type("Boxname");
  cy.get('input[name="color"]').type("color");
  cy.get('input[name="price"]').type(twoDigitNo);
  cy.get('input[name="deadWeight"]').type(0.5);
  cy.contains("p", "Save").click();
  cy.xpath("//*[text()='Seller Box Created SuccessFully']").should(
    "be.visible"
  );
}
// Add product to box
export function addProducttoBox() {
  cy.waitUntil(() => cy.get('[alt="ADD PRODUCTS BOX 1"]')).click();

  cy.waitUntil(() => cy.get('input[placeholder="Search Products"]'))
    .type("Boatneck")
    .click();
  cy.xpath("(//*[@data-cy='product-box'])[1]").click();
  cy.wait(2000);
  cy.waitUntil(() => cy.xpath("//p[text()='Save']")).click();
}
// Select box info
export function SelectBoxInfo() {
  cy.waitUntil(() =>
    cy.xpath("(//*[@class='flex text-sm']//parent::div)[1]")
  ).click();

  cy.waitUntil(() => cy.xpath("//p[text()='Save']")).click();

  cy.waitUntil(() => cy.xpath("//p[text()='Next']")).click();
}
export function selectforwordservices() {
  cy.wait(2000);
  cy.waitUntil(() => cy.contains("p", "Service")).should("be.visible");

  cy.waitUntil(() => cy.contains("p", "Cheapest").click());
  cy.contains("p", "Next").click();
  cy.wait(5000);
  cy.waitUntil(() => cy.contains("p", "Summary").should("be.visible"));
  cy.contains("p", "Place Order").click();
}

export function cancelOrder() {
  cy.wait(6000);
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
}

export function selectReverseOption() {
  cy.visit("https://sysellerdev.yaarilabs.com/orders/add-order/pickup");

  // Wait for the page to load properly
  cy.waitUntil(() => cy.get("#address-checkbox").should("be.visible"), {
    timeout: 10000, // 10 seconds timeout
    interval: 500, // Check every 0.5 seconds
  });
  cy.xpath("//*[@name='REVERSE']").click();

  // Fill in pickup details
  cy.wait(2000);
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
}

export function selectReverseServiceOption() {
  cy.wait(2000);
  cy.waitUntil(() => cy.contains("p", "Service")).should("be.visible");

  cy.waitUntil(() => cy.contains("p", "Cheapest").click());
  cy.xpath("//*[@data-cy='view-all-services']").click();

  // cy.contains("p", "Next").click();
  cy.wait(5000);
  cy.xpath("(//*[contains(text(), 'reverse')])[1]")
    .scrollIntoView()
    .should("be.visible");
  cy.wait(3000);
  cy.xpath("(//*[contains(text(), 'reverse')])[1]").click();
  cy.wait(2000);
  cy.contains("p", "Next").click();
  cy.waitUntil(() => cy.contains("p", "Summary").should("be.visible"));
  cy.contains("p", "Place Order").click();
}

// login
export function Login() {
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
  cy.get("#email").should("be.visible").type("tech@shipyaari.com");
  cy.get("#password").type("Rachana@123");

  // Click on the Log In button and wait for the login request to complete
  cy.contains("Log In").click();

  //cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

  // Verify the URL after successful login
  cy.url().should("include", "/overview");
}

export function AddPickupAddress() {
  cy.visit("https://sysellerdev.yaarilabs.com/catalogues/address-book");
  cy.xpath("//*[text()='Add Address']//parent::button").should("be.visible");
  cy.xpath("//*[text()='Add Address']//parent::button").click();
  cy.wait(1000);
  cy.get("#selectDropdown").then(($dropdown) => {
    expect($dropdown).to.exist;

    const options = $dropdown.find("option");

    expect(options).to.have.length.at.least(1);

    const pickupOption = options.filter(':contains("Pickup Address")');
    expect(pickupOption).to.exist;

    cy.get("#selectDropdown").select("Pickup Address");
  });
  cy.xpath("//*[@name= 'addressType']").type("Techniplex - II");
  cy.xpath("//*[@name= 'flatNo']").type("12A, 3rd Floor");
  cy.xpath("//*[@name= 'sector']").type("off Veer Savarkar Flyover, Malad");
  cy.xpath("//*[@name= 'landmark']").type("Liliya Nagar");
  cy.xpath("//*[@name= 'pincode']").type("400062");
  cy.wait(2000);
  cy.xpath("//*[@name= 'contactName']").type("rachana");

  let MobilNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
  cy.log("mobileNumber" + `${MobilNumber}`);
  cy.xpath("//*[@name= 'contactNumber']").type(MobilNumber);
  cy.xpath("//*[text()='Save']//parent::button").click();
  cy.wait(2000);
}
