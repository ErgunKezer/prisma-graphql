import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const findElementById = (id, items) => {
  return items.find((item) => item.id === id);
};
const getUserId = ({ headers }, requireAuth = true) => {
  const header = headers.authorization;
  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismysecret');
    if (!decoded) {
      throw new Error('Authentication required');
    }
    return decoded.userId;
  }
  if (requireAuth) {
    throw new Error('Authentication required');
  }
  return null;
};

const generateError = (error) => {
  return new Error(error);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'thisismysecret', { expiresIn: '7 days' });
};

const hashPassword = (password) => {
  const passwordLen = password && password.length > 7;
  if (!passwordLen) {
    throw new Error('Password must be 8 characters or longer');
  }
  return bcrypt.hash(password, 10);
};
export { findElementById, getUserId, generateError, generateToken, hashPassword };
