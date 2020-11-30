import { extractFragmentReplacements } from 'prisma-binding';
import Mutation from '@/resolvers/Mutation';
import Query from '@/resolvers/Query';
import Subscription from './Subscription';

import Comment from './Comment';
import User from './User';
import Post from './Post';

const resolvers = {
  Comment,
  User,
  Post,
  Mutation,
  Query,
  Subscription,
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements };
