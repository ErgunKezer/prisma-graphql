// node imports
import { GraphQLServer } from 'graphql-yoga';
import jwt from 'jsonwebtoken';

// js imports
import prisma from './prisma';
import { resolvers, fragmentReplacements } from '@/resolvers';

import permissions from '@/middlewares/auth.middleware';

function getUserId(request, connection) {
  let token;
  try {
    token = request ? request.headers.authorization : connection.context.Authorization;
    token = token.replace('Bearer ', '');
    token = jwt.verify(token, 'thisismysecret');
  } catch (e) {
    return null;
  }
  return token.userId;
}

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  context({ request, response, connection }) {
    return {
      request,
      response,
      prisma,
      userId: getUserId(request, connection),
    };
  },
  middlewares: [permissions],
  fragmentReplacements,
});

server.start(() => {
  console.log('The server is up');
});
