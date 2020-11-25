export default {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
    };
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },
  me(parent, args, { prisma, userId }, info) {
    return prisma.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
};
