import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from '@/resolvers';
const prisma = new Prisma({
  typeDefs: __dirname + '/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET_KEY,
  fragmentReplacements,
});

export default prisma;
