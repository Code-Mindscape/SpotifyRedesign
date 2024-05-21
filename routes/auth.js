var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../db/usersModel");
require('dotenv').config()
router.get("/signup", function (req, res, next) {
  res.render("signup");
});
router.post("/signup", async function (req, res, next) {
  const { fullname, username, email, password } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      const newUser = await userModel.create({
        fullname: fullname,
        username: username,
        email: email,
        password: hash,
        likedsongs: []
      });
      let token = jwt.sign({email} , process.env.JWT_SECRET_KEY);
      res.cookie("token", token);
      res.redirect("/home");
    });
  });
});
router.get("/login", function (req, res, next) {
  res.render("login");
});
router.post("/login", async function (req, res, next) {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);
        res.cookie("token", token);
        res.redirect("/home");
      } else {
        res.redirect("/");
      }
    });
  }
});

router.get("/logout", function (req, res, next) {
  res.cookie("token", "");
  res.redirect("/");
});

module.exports = router;
