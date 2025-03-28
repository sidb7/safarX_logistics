import "./commands";
import "./mongodb";
import "./redis";
import Redis from "redis";

import "./commands";
Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
