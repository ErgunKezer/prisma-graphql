// node imports
import { GraphQLServer } from 'graphql-yoga';
import jwt from 'jsonwebtoken';

// js imports
import prisma from './prisma';

import Mutation from '@/mutation';
import Query from '@/query';
import Subscription from './resolvers/Subscription';

import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Post from './resolvers/Post';

import permissions from '@/middlewares/auth.middleware';

function getUserId({ headers }) {
  let token;
  try {
    token = headers.authorization;
    token = token.replace('Bearer ', '');
    token = jwt.verify(token, 'thisismysecret');
  } catch (e) {
    return null;
  }
  return token.userId;
}

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
      userId: getUserId(request),
    };
  },
  middlewares: [permissions],
});

server.start(() => {
  console.log('The server is up');
});
