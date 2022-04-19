import {
  getUsers,
  getOneUserById,
  createUser,
  updateUser,
  hardDeleteUserById,
  getOneUser,
} from './userBaseService';

const UserService = {
  getUsers,
  getOneUserById,
  getOneUser,
  createUser,
  updateUser,
  hardDeleteUserById,
};

export {
  getUsers,
  getOneUserById,
  getOneUser,
  createUser,
  updateUser,
  hardDeleteUserById,
  UserService,
};
