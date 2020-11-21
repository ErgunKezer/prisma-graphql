import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
  return ctx.userId !== null;
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
