import usersModel from "./users-model.js";

export const findUsers = () => usersModel.find();
export const createUser = (user) => usersModel.create(user);
export const deleteUser = (userId) => usersModel.deleteOne({ _id: userId });
export const updateUser = (userId, user) => usersModel.updateOne({ _id: userId }, { $set: user });
export const loginUser = (user) => usersModel.find(user)
