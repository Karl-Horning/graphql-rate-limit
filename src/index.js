import dotenv from "dotenv";
import chalk from "chalk";
import startApolloServer from "./server.js";

const { red } = chalk;

// Load environment variables from .env file
dotenv.config();

/**
 * Ensure that the PORT variable is provided in the .env file
 * @throws {Error} If PORT variable is not provided
 */
if (!process.env.PORT) {
    console.error(red("Please provide a PORT variable in the .env file."));
    process.exit(1);
}

/**
 * The port number for Apollo Server.
 * @type {number}
 */
const port = parseInt(process.env.PORT, 10) || 4000;

// Start Apollo Server on the specified port.
startApolloServer(port);
