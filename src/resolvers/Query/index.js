import user from './user.query';
import post from './post.query';
import comment from './comment.query';

export default {
  ...user,
  ...post,
  ...comment,
};
