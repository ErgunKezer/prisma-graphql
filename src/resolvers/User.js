import { getUserId } from '@/util';
export default {
  email(parent, args, { userId }, info) {
    if (userId && userId === parent.id) {
      return parent.email;
    }
    return null;
  },
};
