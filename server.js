const { ApolloServer } = require("apollo-server");
const Mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const PORT = process.env.PORT;
const URI = process.env.URI;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});

console.log("\nEstablishing connection to database...");

if (process.env.URI != "none") {
  Mongoose.connect(process.env.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
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
} else {
  console.error("Failed to start server: database is unavailable");
}
