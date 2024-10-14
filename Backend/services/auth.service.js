import { User, Role } from '../models';

async function registerUser(userData) {
  const { name, email, password } = userData;

  const user = await User.create({ name, email, password });

  const role = await Role.findOne({ where: { name: 'user' } });
  await user.addRole(role);

  return user;
}
