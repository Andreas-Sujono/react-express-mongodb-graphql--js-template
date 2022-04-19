import app from './app';
import http from 'http';
import { typeDefs, resolvers } from './graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { UserService } from './services/user';

const PORT = process.env.PORT || 3080;

async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection: true,
    dataSources: () => {
      return {
        UserService: UserService,
      };
    },
  });
  await server.start();
  server.applyMiddleware({
    app,
    cors: {
      origin: true, //This will just copy the request origin and put it in response
      optionsSuccessStatus: 200,
      credentials: true,
    },
  });

  //before /graphql
  app.get('/', (req, res) => {
    res.send('hello world');
  });

  //run app
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`${process.env.NODE_ENV} server is listening on port ${PORT}`);
  console.log(`apollo graphql Server ready at http://localhost:3080/graphql`);
}
startApolloServer();
