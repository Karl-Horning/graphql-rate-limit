// Define resolvers for GraphQL queries
const resolvers = {
    Query: {
        books: () => [
            {
                title: "A Game of Thrones",
                author: "George R. R. Martin",
            },
            {
                title: "The Hobbit",
                author: "J. R. R. Tolkien",
            },
        ],
        quote: () =>
            "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is. ― C.S. Lewis",
    },
};

export default resolvers;
