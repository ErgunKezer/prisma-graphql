import { getUserId, generateError } from '@/util';
export default {
  posts(parents, args, { prisma }, info) {
    const opArgs = {
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
  async post(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request, false);
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
  async myPosts(parent, { query }, { prisma, request }, info) {
    const userId = getUserId(request);
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
