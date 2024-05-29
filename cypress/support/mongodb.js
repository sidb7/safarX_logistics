// cypress/support/mongodb.js

const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://shipyaari_pheonix:*****@shipyaari-pheonix-dev.7iwh5sl.mongodb.net/shipyaari_dev?retryWrites=true&w=majority";
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("sy-atlas-dev");
    const collection = database.collection("sy-atlas-dev");
    return collection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    cy.log("Error connecting to MongoDB:");
  } finally {
    await client.close();
  }
}

module.exports = { main };
