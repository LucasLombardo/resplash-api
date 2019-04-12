// Creates GraphQL Yoga server
const { GraphQLServer } = require(`graphql-yoga`);
const Mutation = require(`./resolvers/Mutation`);
const Query = require(`./resolvers/Query`);
const db = require(`./db`);

function createServer() {
    return new GraphQLServer({
        typeDefs: `src/schema.graphql`,
        resolvers: {
            Mutation,
            Query,
        },
        // turns off resolver requirement warnings
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
        // allows DB to be accessed from resolvers
        context: req => ({ ...req, db }),
    });
}

module.exports = createServer;