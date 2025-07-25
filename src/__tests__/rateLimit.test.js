import server from "../server.js";

/**
 * Test suite for GraphQL rate limiting functionality.
 *
 * It verifies that the server allows the first request
 * and applies rate limiting on subsequent requests.
 */
describe("Rate limiting", () => {
    /**
     * Test that the first GraphQL query request is allowed
     * and returns the expected quote without errors.
     */
    it("should allow the first request", async () => {
        const res = await server.executeOperation({
            query: `query { quote }`,
        });

        expect(res.errors).toBeUndefined();
        expect(res.data.quote).toBe(
            "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is. ― C.S. Lewis"
        );
    });

    /**
     * Test that a second immediate request is blocked due to rate limiting.
     * It sends two queries and expects the second to return a rate limit error message.
     */
    it("should rate limit the second request", async () => {
        // First request to establish rate limiting state
        await server.executeOperation({
            query: `query { quote }`,
        });

        // Second request should be rejected by rate limiter
        const res = await server.executeOperation({
            query: `query { quote }`,
        });

        expect(res.errors).toBeDefined();
        expect(res.errors[0].message).toMatch(
            /Too many requests, please try again in 15 seconds./i
        );
    });
});
