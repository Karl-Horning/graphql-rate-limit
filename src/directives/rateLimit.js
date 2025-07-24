import { rateLimitDirective } from "graphql-rate-limit-directive";

/**
 * Generates a unique key for rate limiting based on request context.
 * Combines the client's IP address and authorisation token to create an identity.
 *
 * @param {any} parent - The parent resolver result (unused).
 * @param {any} args - The arguments passed to the field (unused).
 * @param {any} context - GraphQL execution context (unused).
 * @param {Object} info - Field resolver info object containing request metadata.
 * @param {string} info.ipAddress - IP address of the client.
 * @param {string|null} info.authorization - Authorisation token from headers, if available.
 * @returns {string} A unique string key to identify the requester.
 */
const keyGenerator = (_, __, ___, { ipAddress, authorization }) =>
    `${ipAddress}:${authorization}`;

/**
 * Extracts the type definitions and transformer function required to apply
 * the @rateLimit directive in a GraphQL schema.
 *
 * @type {{
 *   rateLimitDirectiveTypeDefs: import('graphql').DocumentNode,
 *   rateLimitDirectiveTransformer: (schema: import('graphql').GraphQLSchema) => import('graphql').GraphQLSchema
 * }}
 */
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
    rateLimitDirective({
        keyGenerator,
    });

export { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer };
