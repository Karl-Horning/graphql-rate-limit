import { rateLimitDirective } from "graphql-rate-limit-directive";

// IMPORTANT: Specify how a rate limited field should determine uniqueness/isolation of operations
// Uses the combination of user specific data (their ip) along the type and field being accessed
const keyGenerator = (_, __, ___, { ipAddress, authorization }) =>
    `${ipAddress}:${authorization}`;

// Extract rateLimitDirectiveTypeDefs and rateLimitDirectiveTransformer from the rateLimitDirective module
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
    rateLimitDirective({
        keyGenerator,
    });

export { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer };
