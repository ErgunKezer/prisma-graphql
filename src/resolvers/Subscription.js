const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      // takes 2 options.
      // second one is always info
      // first one is limitation, your filter
      // prisma => node => client  (it works fine with mutations and queries)
      return prisma.subscription.comment(
        {
          where: {
            node: {
              post: {
                id: postId,
              },
            },
          },
        },
        info
      );
    },
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              published: true,
            },
          },
        },
        info
      );
    },
  },
  myPost: {
    subscribe(parent, args, { prisma, userId }, info) {
      return prisma.subscription.post(
        {
          where: {
            node: {
              author: {
                id: userId,
              },
            },
          },
        },
        info
      );
    },
  },
};

export default Subscription;
