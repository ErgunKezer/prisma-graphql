export default {
  comments(parents, { query }, { prisma }, info) {
    const opArgs = {};
    if (query) {
      opArgs.where = {
        text_contains: args.query,
      };
    }
    return prisma.query.comments(opArgs, info);
  },
};
