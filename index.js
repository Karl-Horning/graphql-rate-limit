// Import necessary modules and packages
const dotenv = require("dotenv");
const chalk = require("chalk");
const { rateLimitDirective } = require("graphql-rate-limit-directive");
const { ApolloServer } = require("apollo-server");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// Destructuring to get specific chalk colors
const { red, green, yellow } = chalk;

// Load environment variables from .env file
dotenv.config();

// IMPORTANT: Specify how a rate limited field should determine uniqueness/isolation of operations
// Uses the combination of user specific data (their ip) along the type and field being accessed
const keyGenerator = (_, __, ___, { ipAddress, authorization }) =>
    `${ipAddress}:${authorization}`;

// Extract rateLimitDirectiveTypeDefs and rateLimitDirectiveTransformer from the rateLimitDirective module
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
    rateLimitDirective({
        keyGenerator,
    });

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
    console.error(red("Please provide a PORT variable in the .env file."));
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
    context: ({ req }) => {
        // Extract IP address from the request object
        const ipAddress = req.connection.remoteAddress;

        // Extract authorization details from the request headers
        const authorization = req.headers.authorization || null;

        // Add IP address and authorization details to the context
        return { ipAddress, authorization };
    },
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

// Start Apollo Server on the specified port.
startApolloServer(port);
