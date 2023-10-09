const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard"); // Redirect to the dashboard if the user is already authenticated
  }
  return next(); // Proceed to the next middleware if the user is not authenticated
}

// Show the login form
router.get("/login", ensureAuthenticated, (req, res) => {
  res.render("login.ejs");
});

// Show the signup form
router.get("/signup", ensureAuthenticated, (req, res) => {
  res.render("signup.ejs");
});

// Handle login logic
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  }),
  (req, res) => {}
);

// Handle signup logic
router.post("/signup", (req, res) => {
  const newUser = new User({ username: req.body.username });
  newUser.password = newUser.generateHash(req.body.password);
  newUser.save((err) => {
    if (err) {
      console.error(err);
      return res.render("signup.ejs");
    }
    res.redirect("/dashboard");
  });
});

// Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/"); // Redirect to the home page or another appropriate route
  });
});

module.exports = router;
