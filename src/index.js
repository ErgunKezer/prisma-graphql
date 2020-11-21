// node imports
import { GraphQLServer } from 'graphql-yoga';

// js imports
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: {
    Comment,
    User,
    Post,
    Mutation,
    Query,
    Subscription,
  },
  context({ request, response }) {
    return {
      request,
      response,
      prisma,
    };
  },
});

server.start(() => {
  console.log('The server is up');
});
