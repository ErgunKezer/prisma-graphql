import { generateError } from '@/util';
export default {
  posts(parents, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy,
      where: {
        published: true,
      },
    };
    if (args.query) {
      opArgs.where.OR = [
        {
          title_contains: args.query,
        },
        {
          body_contains: args.query,
        },
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
  async post(parent, { id }, { prisma, userId }, info) {
    const posts = await prisma.query.posts(
      {
        where: {
          id,
          OR: [
            {
              published: true,
            },
            {
              author: {
                id: userId,
              },
            },
          ],
        },
      },
      info
    );
    if (posts.length) {
      return posts[0];
    }
    return new Error('Post not found');
  },
  async myPosts(parent, { query, skip, after, first, orderBy }, { prisma, userId }, info) {
    const userExist = await prisma.exists.User({
      id: userId,
    });
    if (!userExist) {
      generateError('User not found');
    }

    const opArgs = {
      where: {
        author: {
          id: userId,
        },
      },
      skip,
      after,
      first,
      orderBy,
    };
    if (query) {
      opArgs.where.OR = [
        {
          title_contains: query.title,
        },
        { body_contains: query.body },
      ];
    }
    return prisma.query.posts(opArgs, info);
  },
};
