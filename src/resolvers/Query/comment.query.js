export default {
  comments(parents, { query, skip, after, first, orderBy }, { prisma }, info) {
    const opArgs = { skip, after, first, orderBy };
    if (query) {
      opArgs.where = {
        text_contains: args.query,
      };
    }
    return prisma.query.comments(opArgs, info);
  },
};
