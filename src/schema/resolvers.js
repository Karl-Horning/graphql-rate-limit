/**
 * GraphQL resolvers for top-level query fields.
 *
 * @type {import('@graphql-tools/utils').IResolvers}
 */
const resolvers = {
    Query: {
        /**
         * Returns a list of books with title and author.
         *
         * @returns {Array<{ title: string, author: string }>}
         */
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

        /**
         * Returns a static quote.
         * @returns {string}
         */
        quote: () =>
            "The future is something which everyone reaches at the rate of sixty minutes an hour, whatever he does, whoever he is. ― C.S. Lewis",
    },
};

export default resolvers;
