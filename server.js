const { ApolloServer } = require("apollo-server");
const Mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const { PORT, URI } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

console.log("\nEstablishing connection to database...");

Mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  dbName: "HippTutoring",
})
  .then(() => {
    console.log("Establshed connection to database");
    console.log("Starting server...");

    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`\nStarted server on address ${res.url}`);
  })
  .catch((err) => {
    console.error(`Error starting server:\n${err}\n`);
  });
