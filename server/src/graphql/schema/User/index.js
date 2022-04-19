import { resolvers } from './resolvers.js';
import { gql } from 'apollo-server-express';
import fs from 'fs';
import path from 'path';

const typeDefs = gql`
  ${fs.readFileSync(path.resolve(__dirname, 'user.graphql'), 'utf8')}
`;

export const User = { typeDefs, resolvers };
