// node imports
import { GraphQLServer, PubSub } from 'graphql-yoga';

// js imports
import * as db from './db';
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Subscription from './resolvers/Subscription';
import './prisma';
const pubSub = new PubSub();

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
  context: {
    db,
    pubSub,
  },
});

server.start(() => {
  console.log('The server is up');
});
