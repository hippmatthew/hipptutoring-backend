import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

import typeDefs from "./graphql/typedefs.js";
import resolvers from "./graphql/resolvers/index.js";

const { PORT, URI } = process.env;

interface IContext {
  token?: string;
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});

console.log("\nEstablishing connection to database...");

mongoose.set("strictQuery", false);
mongoose
  .connect(URI, {
    dbName: "HippTutoring",
  })
  .then(async () => {
    console.log("Establshed connection to database");
    console.log("Starting server...");

    return await startStandaloneServer(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
      listen: { port: Number(PORT) },
    });
  })
  .then((res) => {
    console.log(`\nStarted server on address ${res.url}`);
  })
  .catch((err) => {
    console.error(`Error starting server:\n${err}\n`);
  });
