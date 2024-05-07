const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";

// Post
// Admin - Check Login

router.post("/admin", async (req, res) => {
  try {
    // Get user from the request body
    const { username, password } = req.body;

    res.redirect("/admin");
    // res.render('admin/index', { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});
// Post
// Admin - Register

router.post("/register", async (req, res) => {
  try {
    // Get user from the request body
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User Created", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "User already in use" });
      }
      res.status(500).json({message:'internal server error'})
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "NodeJs-Admin",
      description: "Simple Blog created with NodeJs , Express & MongoDb.",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
