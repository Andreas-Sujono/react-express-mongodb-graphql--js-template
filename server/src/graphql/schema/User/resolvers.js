const queries = {
  user: (_, args, { dataSources }) => {
    return dataSources.UserService.getOneUserById(args.id);
  },
  users: (_, __, { dataSources }) => {
    return dataSources.UserService.getUsers();
  },
};

const mutations = {
  createUser: (root, args, { dataSources }) => {
    return dataSources.UserService.createUser({
      ...args.data,
    });
  },
};

export const resolvers = { queries, mutations };
