import { config } from "dotenv";
import chalk from "chalk";
import server from "./server.js";

const { red, green, yellow } = chalk;

// Load environment variables from .env file
config();

/**
 * Ensure that the PORT variable is provided in the .env file
 *
 * @throws {Error} If PORT variable is not provided
 */
if (!process.env.PORT) {
    console.error(red("Please provide a PORT variable in the .env file."));
    process.exit(1);
}

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

/**
 * The port number for Apollo Server.
 *
 * @type {number}
 */
const port = parseInt(process.env.PORT, 10) || 4000;

// Start Apollo Server on the specified port.
startApolloServer(port);
