import UserDb from '../../entities/user';

export async function getUsers() {
  const users = await UserDb.findAll();
  users.forEach((user) => {
    user.hashed_password = '**CONFIDENTIAL**';
  });
  return users;
}

export async function getOneUserById(id) {
  const user = await UserDb.findById(id);
  if (user) user.hashed_password = '**CONFIDENTIAL**';
  return user;
}

export async function createUser(data) {
  return UserDb.insert(data);
}

export async function updateUser(data) {
  return UserDb.update(data);
}

export async function hardDeleteUserById(id) {
  return UserDb.hardDeleteById(id);
}
