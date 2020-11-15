// prisma second arg can get null, string and object
// null only gives you scalar types
export default {
  users(parent, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            name_contains: args.query,
          },
          {
            email_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.users(opArgs, info);
  },
  posts(parents, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        OR: [
          {
            title_contains: args.query,
          },
          {
            body_contains: args.query,
          },
        ],
      };
    }
    return prisma.query.posts(opArgs, info);
  },
  comments(parents, args, { prisma }, info) {
    const opArgs = {};
    if (args.query) {
      opArgs.where = {
        text_contains: args.query,
      };
    }
    return prisma.query.comments(opArgs, info);
  },
};
