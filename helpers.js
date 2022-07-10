const bcrypt = require('bcryptjs');

const getUserByEmail = (email, database) => {
  return Object.values(database).find(user => user.email === email);
};

function generateRandomString(length) {
  if (!length) {
    length = 6;
  }
  return Math.random().toString(36).substring(length);
};

const urlsForUser = (id, db) => {
  let filtered = {};
  for (let urlID of Object.keys(db)) {
    if (db[urlID].userID === id) {
      filtered[urlID] = db[urlID];
    }
  }
  return filtered;
};

const addUser = (email, password, db) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = generateRandomString();
  db[id] = {
    id,
    email,
    password: hashedPassword
  };
  return id;
};

module.exports = { getUserByEmail, generateRandomString, urlsForUser, addUser };
