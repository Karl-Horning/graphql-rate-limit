/**
 * Creates the context object for each GraphQL request.
 * Extracts IP address and authorisation token from the request headers.
 *
 * @param {object} params - The context creation parameters.
 * @param {object} params.req - The HTTP request object.
 * @param {object} params.req.headers - Request headers.
 * @param {string} [params.req.headers.authorization] - Optional auth token.
 * @param {object} params.req.connection - Connection info.
 * @param {string} params.req.connection.remoteAddress - The IP address of the client.
 * @returns {{ ipAddress: string, authorization: string|null }} Context to be passed into resolvers.
 */
const context = ({ req }) => {
    const ipAddress = req.connection.remoteAddress;
    const authorization = req.headers.authorization || null;
    return { ipAddress, authorization };
};

export default context;
