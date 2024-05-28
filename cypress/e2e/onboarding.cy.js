import { getValue } from "../support/redis";

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

  it("should successfully create an order with pickup details", () => {
    cy.visit("https://sysellerdev.yaarilabs.com");
    cy.wait(2000);
    cy.xpath("//*[text()='Sign Up']").click();
    cy.xpath("//*[text()='Sign up to create your account']").should(
      "be.visible"
    );
    cy.xpath("//*[@id='fName']").type("Rachana");
    cy.xpath("//*[@id='fName']").invoke("val").should("not.be.empty");
    cy.xpath("//*[@id='lName']").type("Muneshwar");
    cy.xpath("//*[@id='lName']").invoke("val").should("not.be.empty");
    cy.xpath("//*[@id='email']").type("tech@shipyaari.com");
    cy.xpath("//*[@id='email']").invoke("val").should("not.be.empty");
    cy.xpath("//*[@id='password']").type("Rachana@123");
    cy.xpath("//*[@id='password']").invoke("val").should("not.be.empty");
    cy.xpath("//*[text()='Sign Up']").click();
    cy.wait(3000);
    cy.xpath("//*[text()='Mobile Verification']").should("be.visible");
    let MobilNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    cy.log("mobileNumber" + `${MobilNumber}`);
    cy.xpath(
      "(//*[text()='Enter Your 10 Digit Mobile Number']//parent::div)[1]"
    ).type(MobilNumber);
    cy.xpath("(//*[text()='Verify Number']//parent::button)[1]").click();
    cy.wait(3000);

    // Request the OTP and use it

    cy.request({
      method: "POST",
      url: "https://sysellerconsoledev.yaarilabs.com/api/v1/seller/getOtp",
      body: {
        email: "tech@shipyaari.com",
        password: "Rachana@123",
      },
    }).then((response) => {
      // Ensure the response status is 200
      expect(response.status).to.eq(200);

      // Retrieve OTP from response body
      let otpValue = response.body.data.redisData;
      cy.log(`Retrieved OTP: ${otpValue}`);

      // Enter the OTP into the input field
      cy.xpath(
        "//*[text()='Enter Mobile OTP ']//preceding-sibling::input"
      ).type(otpValue);
      cy.xpath("//*[text()='Enter Mobile OTP ']//preceding-sibling::input")
        .invoke("val")
        .should("not.be.empty");
      cy.xpath("//p[text()='Submit OTP']").click();
      cy.xpath("//*[text()='Get Started']").should("be.visible");
      cy.xpath("(//*[text()='Set Up My Account'])[1]").click();
      cy.xpath("//span[text()='Describe yourself']").should("be.visible");
      cy.xpath("//input[@title='Checkbox']").then(($checkboxes) => {
        // Get the first two checkboxes from the matched elements
        const checkbox1 = $checkboxes[0];
        const checkbox2 = $checkboxes[1];

        // Check the first checkbox
        cy.wrap(checkbox1).check();

        // Optionally, check the second checkbox as well
        cy.wrap(checkbox2).check();
      });
      cy.xpath("(//*[text()='Next'])[1]").click();
      cy.xpath("//*[text()='What is your daily order volume?']").should(
        "be.visible"
      );
      cy.xpath("//input[@title='Checkbox']").then(($checkboxes) => {
        // Get the first two checkboxes from the matched elements
        const checkbox1 = $checkboxes[0];
        const checkbox2 = $checkboxes[1];

        // Check the first checkbox
        cy.wrap(checkbox1).check();

        // Optionally, check the second checkbox as well
        cy.wrap(checkbox2).check();
      });
      cy.xpath("(//*[text()='Next'])[1]").click();

      cy.xpath("//*[text()='How do you sell your products?']").should(
        "be.visible"
      );
      cy.xpath("//input[@title='Checkbox']").then(($checkboxes) => {
        // Select a random checkbox from the matched elements
        const randomIndex = Math.floor(Math.random() * $checkboxes.length);
        const randomCheckbox = $checkboxes[randomIndex];

        // Check the selected checkbox
        cy.wrap(randomCheckbox).check();
      });
      cy.xpath("(//*[text()='Next'])[1]").click();

      cy.xpath("//*[text()='Which product are you looking for?']").should(
        "be.visible"
      );
      cy.xpath("//input[@title='Checkbox']").then(($checkboxes) => {
        // Select a random checkbox from the matched elements
        const randomIndex = Math.floor(Math.random() * $checkboxes.length);
        const randomCheckbox = $checkboxes[randomIndex];

        // Check the selected checkbox
        cy.wrap(randomCheckbox).check();
      });
      cy.xpath("(//*[text()='Next'])[1]").click();

      cy.xpath("//*[text()='Which industry are you in?']").should("be.visible");
      cy.wait(1000);
      cy.get("#selectDropdown").then(($dropdown) => {
        // Get all the options within the dropdown
        const options = $dropdown.children("option");

        // Select a random option by index
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomOption = options.eq(randomIndex).text();

        // Select the random option by visible text using cy.select()
        cy.get("#selectDropdown").select(randomOption);
      });

      cy.xpath("//*[text()='Next']").click();
      cy.wait(2000);
      cy.xpath("(//*[text()='Benefits of doing KYC'])[1]").should("be.visible");
      cy.xpath("(//*[text()='Proceed For KYC'])[1]").click();
      cy.wait(1000);
      cy.xpath("//*[text()='Please confirm your business type']")
        .should("be.visible")
        .click();
      cy.xpath("//*[text()='Proceed For KYC']").should("be.visible");

      cy.xpath(
        "(//*[@value='individual']/../parent::div//parent::div)[1]"
      ).click();
      cy.wait(2000);
      cy.xpath("//*[text()='Proceed For KYC']").click();
      cy.wait(500);
      cy.xpath("//*[@title='Checkbox']").click();
      cy.wait(500);
      cy.xpath("//*[text()='Accept And Continue']//parent::button").click();
      cy.wait(3000);
      //   cy.xpath("//*[text()='SERVICE AGREEMENT']").should(be.visible);
      cy.xpath("//*[@title='Checkbox']").click();
      cy.xpath("//*[text()='Accept And Continue']").click();
      cy.wait(2000);
      cy.get("button").should("be.disabled");
      cy.xpath("//*[@id='aadharNumber']").type(274706282721);
      cy.wait(500);
      cy.xpath("//*[@id='panNumber']").type("ETWPM5662M");
      cy.get("button").should("not.be.disabled");
      cy.get("button").click();
      cy.wait(5000);
      cy.get("button").should("be.disabled");

      cy.xpath("//*[@id='aadharOtp']").type(123456);

      cy.get("button").should("not.be.disabled");
      cy.wait(2000);
      cy.xpath("//*[text()='Verify OTP']").click();
      cy.xpath("//*[text()='Congratulations!']").should("be.visible");
      cy.xpath("//*[text()='Next']").click();
      cy.xpath("//*[text()='Pickup']").should("be.visible");
      cy.xpath("(//*[@alt='edit'])[1]").click();
      // cy.xpath("//*[text() = 'AADHAAR']/../p[2]//input").clear();
      cy.wait(1000);
      cy.xpath("//*[text() = 'AADHAAR']/../p[2]").type(
        "Neel kamal society , 2nd floor  202 flat number, H Wings , chincholi patak  malad west 400064 mumbai , maharashtra "
      );
      cy.xpath("//*[text()='Brand Name']//parent::div").type("Rich");

      const fileName = "logo.png"; // Make sure this file is in the cypress/fixtures directory

      cy.xpath("//*[@placeholder='Choose Images ']").attachFile(fileName);
      cy.wait(4000);
      cy.xpath("//*[text()='Submit']").click();
      cy.wait(2000);
      cy.xpath("//*[text()='Brand Name And Logo Updated Successfully']").should(
        "be.visible"
      );
      cy.wait(4000);
      cy.xpath("//p[text()='Skip For Now']").click();
      cy.xpath("//*[text()='Cash On Delivery']").should("be.visible");
      cy.xpath("//*[text()='Yes']").click();
      // let AccountNumber = Math.floor(Math.random() * 900000000000) + 1000000000;
      // cy.log("AccountNumber" + `${AccountNumber}`);
      cy.xpath("//*[@id='accountNumber']").type(50100567703893);
      cy.xpath("//*[@id='ifscCode']").type("HDFC0000411");
      cy.xpath("//*[text()='Verify Bank']//parent::button").click();
      cy.xpath("//*[text()='Bank Details verified successfully']").should(
        "be.visible"
      );
      cy.log("OnBoarding process successfully Done");
    }); //p[text()='SKIP FOR NOW']
    cy.wait(5000);
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
  after(() => {
    //
    //  Perform any cleanup or logout if necessary
    // cy.xpath("(//*[@id='profileIcon']//button)[2]").click();
    // cy.xpath("//*[text()='Sign out']").click();
    // cy.xpath("//*[text()='Logged Out Successfully.']").should("be.visible");
  });
});
