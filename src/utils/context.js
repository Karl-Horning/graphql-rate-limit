const context = ({ req }) => {
    // Extract IP address from the request object
    const ipAddress = req.connection.remoteAddress;

    // Extract authorization details from the request headers
    const authorization = req.headers.authorization || null;
    return { ipAddress, authorization };
};

export default context;
