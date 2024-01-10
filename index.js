// Import necessary modules and packages
const dotenv = require("dotenv");
const chalk = require("chalk");
const {
    defaultKeyGenerator,
    rateLimitDirective,
} = require("graphql-rate-limit-directive");
const { ApolloServer } = require("apollo-server");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// Destructuring to get specific chalk colors
const { red, green, yellow } = chalk;

// Load environment variables from .env file
dotenv.config();

// DebugRateLimiterMemory is not necessary; it's for demonstration purposes
class DebugRateLimiterMemory extends RateLimiterMemory {
    consume(key, pointsToConsume, options) {
        console.log(`[CONSUME] ${key} for ${pointsToConsume}`);
        console.log("key:", key);
        return super.consume(key, pointsToConsume, options);
    }
}

// Extract rateLimitDirectiveTypeDefs and rateLimitDirectiveTransformer from the rateLimitDirective module
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
    rateLimitDirective();

// Define resolvers for GraphQL queries
const resolvers = {
    Query: {
        books: () => [
            {
                title: "A Game of Thrones",
                author: "George R. R. Martin",
            },
            {
                title: "The Hobbit",
                author: "J. R. R. Tolkien",
            },
        ],
        quote: () =>
            "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is. ― C.S. Lewis",
    },
};

// Create an executable schema with rate limiting directives
let schema = makeExecutableSchema({
    typeDefs: [
        rateLimitDirectiveTypeDefs,
        `# Allow each field to be queried once every 15 seconds
      type Query @rateLimit(limit: 1, duration: 15) {
        books: [Book!]
        quote: String
      }
  
      type Book {
        title: String
        author: String
      }`,
    ],
    resolvers,
});
schema = rateLimitDirectiveTransformer(schema);

/**
 * Ensure that the PORT variable is provided in the .env file
 * @throws {Error} If PORT variable is not provided
 */
if (!process.env.PORT) {
    console.error("Please provide a PORT variable in the .env file.");
    process.exit(1);
}

/**
 * The port number for Apollo Server.
 * @type {number}
 */
const port = parseInt(process.env.PORT, 10) || 4000;

/**
 * The Apollo Server instance for serving GraphQL requests.
 * @type {ApolloServer}
 */
const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
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
        console.error("Error during graceful shutdown:", error);
        process.exit(1);
    }
});

/**
 * Starts the Apollo Server and listens on the specified port.
 * @function
 * @param {number} initialPort - The initial port number to attempt to listen on.
 * @param {number} [maxAttempts=10] - The maximum number of attempts to find an available port.
 */
const startApolloServer = (initialPort, maxAttempts = 10) => {
    /**
     * Attempt to start the server on the specified port.
     * @async
     * @param {number} port - The port number to attempt.
     * @param {number} attempt - The current attempt number.
     * @throws {Error} If unable to find an available port after the maximum number of attempts.
     */
    const tryPort = async (port, attempt) => {
        try {
            const { url } = await server.listen({ port });
            console.log(`Apollo Server started at ${url} 🚀`);
        } catch (error) {
            if (error.code === "EADDRINUSE" && attempt < maxAttempts) {
                console.error(
                    red(
                        `Port ${port} is already in use. Trying another port...`
                    )
                );
                tryPort(port + 1, attempt + 1);
            } else {
                console.error(red(`Error starting Apollo Server: ${error}`));
                console.error(
                    red(
                        `Unable to find an available port after ${maxAttempts} attempts.`
                    )
                );
                process.exit(1);
            }
        }
    };

    // Start attempting to listen on the initial port
    tryPort(initialPort, 1);
};

// Start Apollo Server on the specified port.
startApolloServer(port);
