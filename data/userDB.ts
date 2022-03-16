type User = {
  name?: string;
  email: string;
  password?: string;
};

const userDB: User = { name: "", email: "", password: "" };

module.exports = { userDB };
