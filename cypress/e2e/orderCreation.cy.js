


describe('Login and Order Pickup Tests ', () => {
    beforeEach('should successfully create an order with pickup details', () => {
      // Intercept login request
      Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })
      cy.intercept('POST', 'https://sysellerdev.yaarilabs.com/auth/login').as('loginRequest');
  
      // Clear local storage and cookies
      cy.clearLocalStorage();
      cy.clearCookie('session_id');
  
      // Visit the login page
      cy.visit('https://sysellerdev.yaarilabs.com/auth/login');
  
      // Verify the title of the page
      cy.title().should('include', 'Shipyaari');
  
      // Enter login credentials
      cy.wait(2000);
      cy.get('#email').type('rachana.muneshwar@shipyaari.com');
      cy.get('#password').type('Rachana@123');
  
      // Click on the Log In button and wait for the login request to complete
      cy.contains('Log In').click();
    //  cy.wait('@loginRequest');
  
      // Verify the URL after successful login
      cy.url().should('include', '/overview');
    });
  
    //--------------------------Pickup Addrrss Added-------------------//

//     it('should successfully create an order with pickup details', () => {
//         // Visit the order pickup page
//         cy.visit('https://sysellerdev.yaarilabs.com/orders/add-order/pickup');
//         // Fill in pickup details
        
//         cy.get("#address-checkbox").click();
//         cy.get('img[alt="Arrow"]').click();
//         cy.wait(2000); 
//         cy.get('img[alt="Arrow"]').should('be.visible');
//         // Fill in contact person details
//         cy.wait(1000)
//         // Fill in contact number
      
//         // cy.get("#hubspot-conversations-iframe").then($iframe => {
//         //   $iframe.remove();
//         // });
//         cy.get('input[placeholder="Pickup Date"]').click();
//         cy.get('button:contains("Tomorrow")').click();
//         cy.get('button:contains("12:00 PM - 03:00 PM")').click();
//         //save and process 
//         cy.contains('button', 'Save').click();

//         //cy.get('.px-1 > .hidden > .flex').click();
//         cy.contains('button', 'Next').click();
//         cy.url().should('include', '/delivery');
//         // cy.get('.Toastify__toast-body').should('be.visible').and('contain','Pick-Up Address Info Added');
//         // cy.get('.Toastify__toast-body').click(); // replace with the selector for the close button


//         //--------------------------Delivery Addrrss Added-------------------//
       
//         cy.get('.magicAddressInput').type('12a, 3rd Floor, Techniplex - Ii, Off Veer Savarkar Flyover, Malad West Mumbai, Maharashtra 400062');
//         cy.xpath("//*[@alt='Arrow']").click(); 
//         cy.wait(4000);
//         cy.xpath("//*[text()='Name of the contact person']//parent::div").type('delivery\ contact person name')
//         cy.xpath("//*[text()='Mobile Number']//parent::div").type('6020553393');
//         cy.xpath("//p[text()='Billing Details Is Same As Delivery']").should('be.visible').and('contain','Billing Details Is Same As Delivery');
//         cy.xpath("//p[text()='Next']").click();


//         //--------------------------BOX Details Added-------------------//
//         cy. wait(1000)
// //add product info 
// cy.xpath("//*[text()='Add Product To Catalogue']").click();
// cy.xpath("//label[text()='Product name']//preceding::input").type('crop top');

// cy.get('input[name="category"]').click();
// cy.xpath("//*[@name='category']").type('Media').type('{enter}').click() // Assuming you want the first element, use eq(0)
// cy.get('input[name="unitPrice"]').type(100);
// cy.get('input[name="length"]').type(14);
// cy.get('input[name="breadth"]').type(10);
// cy.get('input[name="height"]').type(12);
// cy.get('input[name="deadWeight"]').type(0.5);
// cy.get('input[name="sku"]').type("TEST01"); // Assuming TEST01 is a string
// cy.xpath("//*[text()='Save']").click();
// //cy.get('[class="Toastify__toast-body"]').should('be.visible');
// cy.wait(4000);


//       //add box info
// cy.xpath("//*[text()='Add Box To Catalogue']").click();
// cy.wait(2000);
//       cy.get('input[name="length"]').type(14);
//       cy.get('input[name="breadth"]').type(10);
//       cy.get('input[name="height"]').type(12);
//       cy.get('input[name="name"]').type("Boxname");
//       cy.get('input[name="color"]').type('color');
//       cy.get('input[name="price"]').type(50);
//       cy.get('input[name="deadWeight"]').type(0.5);
//       cy.contains('p', 'Save').click();
//    //   cy.get('[class="Toastify__toast-body"]').should('be.visible')
   

//       //Add product to box 
//       cy.wait(2000);
//       cy.get('[alt="ADD PRODUCTS BOX 1"]').click();
//       cy.wait(1000);
//       cy.get('input[placeholder="Search Products"]').type('crop top').click();
//       cy.xpath("(//*[text()='Crop Top'])[1]//parent::div").click();
//       cy.wait(1000);
//       cy.xpath("//*[contains(@class, 'capitalize') and text()='Save']").click();
//       cy.wait(1000);

  
// //select box info
 
//       cy.xpath("(//*[@class='flex text-sm']//parent::div)[1]").click();
//      cy.wait(4000);
//     cy.xpath("//*[contains(@class, 'capitalize') and text()='Save']").click();
//     cy.wait(4000);
//     cy.xpath("//*[contains(@class, 'capitalize') and text()='Next']").click();
//     cy.wait(4200);
//       cy.contains('p', 'Service').should('be.visible');
//       cy.wait(3000);
//       cy.contains('p' , 'Cheapest').click()
//       cy.contains('p', 'Next').click();
//       cy.wait(4000);
//       cy.contains('p','Summary').should('be.visible');
//       cy.contains('p','Place Order').click();


//       //cancel the shipment
    
//       cy.wait(2000);
//       cy.xpath("(//*[@alt='moreIcon'])[1]//parent::div").click();
//       cy.on('window:alert', (text) => {
//         // Assert on the alert message
//         expect(text).to.equal('Are You Sure You Want To Cancel This Order');
//         cy.xpath("(//*[@type='submit'])[2]").click();
//         cy.wait(2000);

//       });
      
//       // Triggering an action that causes an alert
//       cy.xpath("(//*[text()= 'Cancel Order'])[1]").click();
//       cy.wait(2000);
//       cy.xpath("//button[text()='Yes']").click();

    });
    after(() => {
        // Perform any cleanup or logout if necessary
    });
//});