import { ApolloServer } from "apollo-server";
import schema from "./schema/index.js";
import context from "./utils/context.js";

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



export default server;
