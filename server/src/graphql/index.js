import { User } from './schema/User';

const resolvers = {
  Query: {
    ...User.resolvers.queries,
  },
  Mutation: {
    ...User.resolvers.mutations,
  },
};

const typeDefs = [User.typeDefs];

export { resolvers, typeDefs };
