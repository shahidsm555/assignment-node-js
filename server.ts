const express = require("express");
const http = require("http");
const bcrypt = require("bcrypt");
const path = require("path");
const bodyParser = require("body-parser");
const users = require("./data").userDB;

const app = express();
const server = http.createServer(app);

app.post("/register", async (req, res) => {
  try {
    let foundUser = users.find(data => req.body.email === data.email);
    if (!foundUser) {
      let hashPassword = await bcrypt.hash(req.body.password, 10);

      let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
      };
      users.push(newUser);
      console.log("User list", users);

      res.send("Registration successful");
    } else {
      res.send("Email already used");
    }
  } catch {
    res.send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    let foundUser = users.find(data => req.body.email === data.email);
    if (foundUser) {
      let submittedPass = req.body.password;
      let storedPass = foundUser.password;

      const passwordMatch = await bcrypt.compare(submittedPass, storedPass);
      if (passwordMatch) {
        res.send("login successful");
      } else {
        res.send("Invalid email or password");
      }
    } else {
      let fakePass = `$2b$$10$ifgfgfgfgfgfgfggfgfgfggggfgfgfga`;
      await bcrypt.compare(req.body.password, fakePass);

      res.send("Invalid email or password");
    }
  } catch {
    res.send("Internal server error");
  }
});

server.listen(3000, function () {
  console.log("server is listening on port: 3000");
});
