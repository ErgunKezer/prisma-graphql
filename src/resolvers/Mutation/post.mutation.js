import { getUserId } from '../../util';
export default {
  async createPost(parent, { data }, { prisma, request }, info) {
    const { title, body, published } = data;
    const userId = getUserId(request);
    return prisma.mutation.createPost(
      {
        data: {
          title,
          body,
          published,
          author: {
            connect: {
              id: userId,
            },
          },
        },
      },
      info
    );
  },
  async updatePost(parent, { id, data }, { prisma, request }, info) {
    const userId = getUserId(request);
    const isExist = await prisma.exists.Post({
      id,
      author: {
        id: userId,
      },
    });
    if (!isExist) {
      throw new Error('Unable to update post');
    }
    return prisma.mutation.updatePost(
      {
        data,
        where: {
          id,
        },
      },
      info
    );
  },
  async deletePost(parent, { id }, { prisma, request }, info) {
    const userId = getUserId(request);
    const postExists = await prisma.exists.Post({
      id,
      author: {
        id: userId,
      },
    });
    if (!postExists) {
      throw new Error('Unable to delete post');
    }
    return prisma.mutation.deletePost(
      {
        where: {
          id,
        },
      },
      info
    );
  },
};
