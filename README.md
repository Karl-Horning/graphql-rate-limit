# GraphQL Rate Limit

- [GraphQL Rate Limit](#graphql-rate-limit)
  - [Description](#description)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Example Usage](#example-usage)
  - [FAQ and Troubleshooting](#faq-and-troubleshooting)
    - [Q: Why am I seeing a "PORT variable not provided" error during startup?](#q-why-am-i-seeing-a-port-variable-not-provided-error-during-startup)
    - [Q: How can I customize the rate limit for specific GraphQL fields?](#q-how-can-i-customize-the-rate-limit-for-specific-graphql-fields)
    - [Q: I'm encountering issues with rate limiting in my GraphQL queries. What should I check?](#q-im-encountering-issues-with-rate-limiting-in-my-graphql-queries-what-should-i-check)
    - [Q: Is there a way to disable rate limiting for certain GraphQL queries?](#q-is-there-a-way-to-disable-rate-limiting-for-certain-graphql-queries)
  - [Contributing](#contributing)
  - [Acknowledgments](#acknowledgments)
  - [Author](#author)
  - [License](#license)

## Description

This sandbox is designed for testing the GraphQL Rate Limit Directive, a middleware solution for Apollo Server. The directive enables rate limiting for GraphQL queries, offering control over request frequencies to improve both security and system performance.

## Features

- **Flexible Rate Limiting**: Set limits on specific GraphQL fields based on unique user data.
- **Customizable Key Generation**: Determine uniqueness/isolation of operations using a custom key generator.
- **Easy Integration**: Integrates with Apollo Server and GraphQL schemas.
- **CSRF Prevention**: Enhance security with Cross-Site Request Forgery prevention.

## Installation

To install GraphQL Rate Limit Directive, use the following npm command:

```bash
npm install graphql-rate-limit-directive
```

## Usage

1. Import the required modules and GraphQL Rate Limit Directive.
2. Configure the rate limiting directives using `rateLimitDirective`.
3. Define your GraphQL schema, applying rate limiting to specific fields.
4. Start your Apollo Server instance with the configured schema.

### Example Usage

```javascript
// Import necessary modules and packages
const { rateLimitDirective } = require("graphql-rate-limit-directive");
const { ApolloServer } = require("apollo-server");

// ... (Other imports and configurations)

// Extract rateLimitDirectiveTypeDefs and rateLimitDirectiveTransformer from the rateLimitDirective module
const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
    rateLimitDirective({
        keyGenerator,
    });

// Create an executable schema with rate limiting directives
let schema = makeExecutableSchema({
    typeDefs: [
        rateLimitDirectiveTypeDefs,
        // Your GraphQL schema definitions with rate limiting directives
    ],
    resolvers,
});

// Apply rate limiting directives to the schema
schema = rateLimitDirectiveTransformer(schema);

// ... (Other configurations)

// Start Apollo Server on the specified port.
startApolloServer(port);
```

For more detailed information, [refer to the GraphQL Rate Limit Directive Documentation](https://www.npmjs.com/package/graphql-rate-limit-directive).

## FAQ and Troubleshooting

### Q: Why am I seeing a "PORT variable not provided" error during startup?

A: This error occurs when the `PORT` environment variable is not set in your `.env` file. Ensure that you have a `.env` file in the project root with the `PORT` variable defined.

### Q: How can I customize the rate limit for specific GraphQL fields?

A: You can customize the rate limit by applying the `@rateLimit` directive to specific fields in your GraphQL schema. Check "Step 3: Attach directive to field or object" in the [Documentation](https://www.npmjs.com/package/graphql-rate-limit-directive) for an example of how to apply rate limiting to specific fields.

### Q: I'm encountering issues with rate limiting in my GraphQL queries. What should I check?

A: Please make sure that you have correctly applied the rate limiting directives to your schema. Ensure that the `rateLimitDirectiveTypeDefs` and `rateLimitDirectiveTransformer` are properly integrated. Refer to the [Usage](#usage) section for a step-by-step guide.

### Q: Is there a way to disable rate limiting for certain GraphQL queries?

A: Yes, you can selectively disable rate limiting for specific queries by not applying the `@rateLimit` directive to those fields in your schema.

## Contributing

Contributions to this example are welcome! Feel free to submit issues or pull requests.

## Acknowledgments

This project uses the following resources:

- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Tools](https://www.graphql-tools.com/)
- [Rate Limiter Flexible](https://github.com/animir/node-rate-limiter-flexible)
- [GraphQL Rate Limit Directive](https://github.com/ravangen/graphql-rate-limit) - Used for rate limiting in this project, and this implementation is based on the [context demo](https://github.com/ravangen/graphql-rate-limit/tree/e8c8d534b0cb1dafc967b818bcc3fc53d8db4b27/examples/context) by ravangen.

## Author

Karl Horning

- [GitHub](https://github.com/Karl-Horning/)
- [LinkedIn](https://www.linkedin.com/in/karl-horning/)
- [CodePen](https://codepen.io/karlhorning)

## License

This repository is licensed under the [MIT License](LICENSE).
