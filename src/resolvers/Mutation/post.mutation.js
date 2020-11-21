export default {
  async createPost(parent, { data }, { prisma, userId }, info) {
    const { title, body, published } = data;
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
  async updatePost(parent, { id, data }, { prisma, userId }, info) {
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
  async deletePost(parent, { id }, { prisma, userId }, info) {
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
