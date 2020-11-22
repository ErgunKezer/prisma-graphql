import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  if (ctx.userId === null) {
    return false;
  }
  const userExist = await ctx.prisma.exists.User({
    id: ctx.userId,
  });
  return userExist;
});

const permissions = shield({
  Query: {
    myPosts: isAuthenticated,
    me: isAuthenticated,
  },
  Mutation: {
    createPost: isAuthenticated,
    updatePost: isAuthenticated,
    deletePost: isAuthenticated,
    createComment: isAuthenticated,
    updateComment: isAuthenticated,
    deleteComment: isAuthenticated,
    deleteUser: isAuthenticated,
    updateUser: isAuthenticated,
  },
});

export default permissions;
