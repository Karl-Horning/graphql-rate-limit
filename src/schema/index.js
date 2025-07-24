import { makeExecutableSchema } from "@graphql-tools/schema";
import {
    rateLimitDirectiveTransformer,
    rateLimitDirectiveTypeDefs,
} from "../directives/rateLimit.js";
import resolvers from "./resolvers.js";

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
