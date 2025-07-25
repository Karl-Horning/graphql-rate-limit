import server from "../server.js";

describe("Rate limiting", () => {
    it("should allow the first request", async () => {
        const res = await server.executeOperation({
            query: `query { quote }`,
        });

        expect(res.errors).toBeUndefined();
        expect(res.data.quote).toBe(
            "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is. ― C.S. Lewis"
        );
    });

    it("should rate limit the second request", async () => {
        // First request to set the limit
        await server.executeOperation({
            query: `query { quote }`,
        });

        // Second request should be rate-limited
        const res = await server.executeOperation({
            query: `query { quote }`,
        });

        expect(res.errors).toBeDefined();
        expect(res.errors[0].message).toMatch(
            /Too many requests, please try again in 15 seconds./i
        );
    });
});
