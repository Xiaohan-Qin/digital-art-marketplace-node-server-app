import usersModel from "./users-model.js";

export const findUsers = () => usersModel.find();
export const findByUsername = (username) => usersModel.findOne({ username: username });
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (userId) => usersModel.deleteOne({ _id: userId });
export const updateUser = (userId, user) => usersModel.updateOne({ _id: userId }, { $set: user });
export const findByCredentials = (username, password) => {
  return usersModel.findOne({ username: username, password: password }, { password: false });
};
