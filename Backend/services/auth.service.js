import { User, Role } from '../models';

async function registerUser(userData) {
  const { username, email, password } = userData;

  const user = await User.create({ username, email, password });

  const role = await Role.findOne({ where: { name: 'user' } });
  await user.addRole(role);

  return user;
}
