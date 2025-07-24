import { ApolloServer } from "apollo-server";
import chalk from "chalk";
import schema from "./schema/index.js";
import context from "./utils/context.js";

const { red, green, yellow } = chalk;

/**
 * Apollo Server instance for handling GraphQL queries.
 * Configured with schema, context, CSRF prevention, and caching.
 *
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
    context,
});

/**
 * Handles graceful shutdown when SIGINT (Ctrl+C) is received.
 *
 * @event
 */
process.on("SIGINT", async () => {
    try {
        console.log(yellow("Received SIGINT. Closing Apollo Server..."));
        await server.stop();
        console.log(green("Apollo Server closed."));
        process.exit(0);
    } catch (error) {
        console.error(red("Error during graceful shutdown:", error));
        process.exit(1);
    }
});

/**
 * Starts the Apollo Server on the specified port.
 *
 * @param {number} port - The port number on which the server should listen.
 */
const startApolloServer = (port) => {
    server
        .listen({ port })
        .then(({ url }) => {
            console.log(`Apollo Server started at ${url} 🚀`);
        })
        .catch((error) => {
            console.error("Error starting Apollo Server:", error);
            if (error.code === "EADDRINUSE") {
                console.error(
                    `Port ${port} is already in use. Please choose another port.`
                );
            } else {
                console.error(`Unknown error during Apollo Server startup.`);
            }
            process.exit(1);
        });
};

export default startApolloServer;
