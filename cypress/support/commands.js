/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import "cypress-wait-until";

// cypress/support/commands.js

// const { MongoClient } = require("mongodb");

// Cypress.Commands.add("connectToDatabase", (collectionName, query) => {
//   const url =
//     "mongodb+srv://shipyaari_pheonix:*****@shipyaari-pheonix-dev.7iwh5sl.mongodb.net/shipyaari_dev?retryWrites=true&w=majority"; // replace with your MongoDB URL
//   const dbName = "sy-atlas-dev"; // replace with your database name

//   return MongoClient.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }).then((client) => {
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     return collection
//       .find(query)
//       .toArray()
//       .then((docs) => {
//         client.close();
//         return docs;
//       });
//   });

// cypress/support/commands.js
//});
// cypress/support/commands.js
const { setValue, getValue } = require("./redis");

Cypress.Commands.add("setRedisValue", (key, value) => {
  cy.wrap(null).then(() => setValue(key, value));
});

Cypress.Commands.add("getRedisValue", (key) => {
  cy.wrap(null).then(() => getValue(key));
});

import "cypress-file-upload";
