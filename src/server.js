import { ApolloServer } from "apollo-server";
import chalk from "chalk";
import schema from "./schema/index.js";
import context from "./utils/context.js";

const { red, green, yellow } = chalk;

/**
 * The Apollo Server instance for serving GraphQL requests.
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
 * Handle SIGINT for graceful shutdown.
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
 * Starts the Apollo Server and listens on the specified port.
 * @function
 * @param {number} port - The port number to listen on.
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
