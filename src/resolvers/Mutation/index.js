import user from './user.mutation';
import post from './post.mutation';
import comment from './comment.mutation';
import auth from './auth.mutation';
export default {
  ...user,
  ...post,
  ...comment,
  ...auth,
};
