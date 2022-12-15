import * as usersDao from "./users-dao.js";

const createUser = async (req, res) => {
  const newUser = req.body;
  const existingUser = await usersDao.findByUsername(newUser.username);
  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  } else {
    const insertedUser = await usersDao.createUser(newUser);
    res.json(insertedUser);
  }
};

const findUsers = async (req, res) => {
  const users = await usersDao.findUsers();
  res.json(users);
};

const updateUser = async (req, res) => {
  const userIdToUpdate = req.params.userId;
  const updates = req.body;
  const status = await usersDao.updateUser((userIdToUpdate, updates));
  res.json(status);
};

const deleteUser = async (req, res) => {
  const userIdToDelete = req.params.userId;
  const status = await usersDao.deleteUser(userIdToDelete);
  res.json(status);
};

const login = async (req, res) => {
  const credentials = req.body;
  const existingUser = await usersDao.findByCredentials(credentials.username, credentials.password);
  if (!existingUser) {
    res.status(403).json({ message: "Invalid login credentials" });
  } else {
    res.json(existingUser);
  }
};

export default (app) => {
  app.post("/api/users", createUser);
  app.get("/api/users", findUsers);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);

  app.post("/api/users/login", login);
};
