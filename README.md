# 🚦 GraphQL Rate Limit Demo

## 📖 Table of Contents

- [🚦 GraphQL Rate Limit Demo](#-graphql-rate-limit-demo)
  - [📖 Table of Contents](#-table-of-contents)
  - [🤓 Overview](#-overview)
  - [✅ Purpose](#-purpose)
  - [📸 Demo](#-demo)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [📦 Installation](#-installation)
  - [🚀 Scripts](#-scripts)
  - [📁 Project Structure](#-project-structure)
  - [📐 Code Style](#-code-style)
  - [🔍 Tests](#-tests)
  - [🌐 Live Site](#-live-site)
  - [📌 To Do](#-to-do)
  - [🧪 Known Issues](#-known-issues)
  - [🤝 Contributing](#-contributing)
  - [📄 Licence](#-licence)
  - [🙋 FAQ](#-faq)
  - [👤 Author](#-author)

---

## 🤓 Overview

A lightweight demonstration of how to implement field-level rate limiting in a GraphQL API using `graphql-rate-limit-directive` and Apollo Server. Built with ES modules and a modular file structure.

This GraphQL server applies per-field rate limits using IP address and auth headers. It is ideal for:

- Prototyping request throttling in a Node.js backend.
- Demonstrating use of Apollo Server with custom directives.
- Serving as a base template for future GraphQL projects.

---

## ✅ Purpose

This project was created to test and demonstrate rate limiting for GraphQL APIs before implementation in a production environment. It also serves as a reference for others interested in adding basic request control to their APIs.

---

## 📸 Demo

No live demo currently. Example output on startup:

```bash
Apollo Server started at http://localhost:4000 🚀
```

Example blocked query after exceeding rate limit:

```json
{
  "errors": [
    {
      "message": "Too many requests, please try again in 15 seconds.",
      "extensions": {
        "code": "RATE_LIMITED"
      }
    }
  ]
}
```

---

## 🛠️ Tech Stack

- **GraphQL Server**: Apollo Server
- **Rate Limiting**: graphql-rate-limit-directive
- **Schema Tools**: @graphql-tools/schema
- **Runtime**: Node.js (ESM)
- **Environment Config**: dotenv
- **Console Styling**: chalk

---

## 📦 Installation

```bash
git clone https://github.com/Karl-Horning/graphql-rate-limit-demo.git
cd graphql-rate-limit-demo
npm install
echo "PORT=4000" > .env
```

---

## 🚀 Scripts

| Command        | Description                                |
| -------------- | ------------------------------------------ |
| `npm start`    | Start the GraphQL server on defined port   |
| `npm run test` | Run automated Jest tests for rate limiting |

---

## 📁 Project Structure

```bash
src/
├── __tests__/
│   └── rateLimit.test.js  # Jest tests for rate limiting behaviour
├── directives/
│   └── rateLimit.js       # Directive setup and key generator
├── schema/
│   ├── index.js           # TypeDefs + directive + schema
│   └── resolvers.js       # Resolvers for queries
├── utils/
│   └── context.js         # Extract IP and auth from request
├── server.js              # Apollo server config
├── index.js               # Entry point, loads .env and starts server
```

---

## 📐 Code Style

This project uses:

- ES Modules (`type: "module"` in `package.json`)
- Semantic console logging with `chalk`
- `.env` for configuration
- Modular file organisation by concern

---

## 🔍 Tests

Automated tests are written using **Jest** and cover basic rate limiting behaviour.

The tests simulate multiple GraphQL queries and check that:

- The first request is **allowed**.
- The second request is **rate limited** and returns the expected error message.

To run the tests:

```bash
npm run test
```

Example output:

```bash
PASS  src/__tests__/rateLimit.test.js
  Rate limiting
    ✓ should allow the first request (xx ms)
    ✓ should rate limit the second request (xx ms)
```

---

## 🌐 Live Site

*Not currently deployed — run locally using the instructions above.*

---

## 📌 To Do

- [x] Modularise monolithic GraphQL setup
- [x] Switch to ES modules
- [x] Add example rate limit tests (for example, with `curl`, Postman, or automated)
- [ ] Add optional Redis integration for distributed rate limiting
- [ ] Add logging middleware for introspection

---

## 🧪 Known Issues

- IP detection via `req.connection.remoteAddress` may be unreliable behind proxies (consider `X-Forwarded-For` in production)
- Rate limiting applies uniformly to all clients by IP and auth; per-user JWT support is not yet implemented

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 Licence

MIT © 2025 Karl Horning

---

## 🙋 FAQ

**Q: Why am I seeing a "PORT variable not provided" error during startup?**
A: Ensure your `.env` file contains a `PORT=4000` or similar line.

**Q: How can I customise rate limits per field?**
A: Use the `@rateLimit(limit: X, duration: Y)` directive on specific fields in the schema.

**Q: Why are my queries getting blocked?**
A: You're likely exceeding the `@rateLimit` values based on your IP and auth header.

**Q: Can I disable rate limiting on some fields?**
A: Yes, simply omit the `@rateLimit` directive on that field.

---

## 👤 Author

Made with ❤️ by [Karl Horning](https://github.com/Karl-Horning)
