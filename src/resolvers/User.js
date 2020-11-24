export default {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { userId }, info) {
      if (userId && userId === parent.id) {
        return parent.email;
      }
      return null;
    },
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { prisma }, info) {
      const opArgs = {
        where: {
          published: true,
          author: {
            id: parent.id,
          },
        },
      };
      return prisma.query.posts(opArgs, info);
    },
  },
  password() {
    return '';
  },
};
