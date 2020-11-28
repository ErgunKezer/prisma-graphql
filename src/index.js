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
    token = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
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

const port = process.env.PORT || 4000;
server.start({ port }, () => {
  console.log('The server is up');
});
