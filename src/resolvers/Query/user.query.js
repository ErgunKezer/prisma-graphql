export default {
  users(parent, args, { prisma }, info) {
    // # of skipped data
    // first is amount of data
    // after gets an id and whenever we find the id it is starting point for us
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
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
