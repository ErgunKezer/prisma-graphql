import bcrypt from 'bcryptjs';
import { generateToken } from '@/util';
export default {
  async login(parent, { data }, { prisma }, info) {
    const { email, password } = data;
    const user = await prisma.query.user({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Unable to login');
    }
    return {
      token: generateToken(user.id),
      user,
    };
  },
};
