import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    rateLimitDirectiveTransformer,
    rateLimitDirectiveTypeDefs,
} from "../directives/rateLimit.js";
import resolvers from "./resolvers.js";

/**
 * Array of GraphQL type definitions including the @rateLimit directive and schema.
 *
 * @type {Array<string | import('graphql').DocumentNode>}
 */
const typeDefs = [
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
];

// Create an executable schema with rate limiting directives
let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

schema = rateLimitDirectiveTransformer(schema);

export default schema;
