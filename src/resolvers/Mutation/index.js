import user from './user.mutation';
import post from './post.mutation';
import comment from './comment.mutation';

export default {
  ...user,
  ...post,
  ...comment,
};
