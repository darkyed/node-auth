const express = require("express");
const router = express.Router();
const passport = require("passport");

// ...

function ensureAuthenticatedDashboard(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, allow them to proceed
  }
  res.redirect("/auth/login"); // Redirect to the login page if the user is not authenticated
}

// Home Page
router.get("/", ensureAuthenticatedDashboard, (req, res) => {
  res.redirect("/dashboard");
  //   res.render("home.ejs", { user: req.user }); // Pass the 'user' object to the view
});

// Dashboard
router.get("/dashboard", ensureAuthenticatedDashboard, (req, res) => {
  if (!req.user) {
    res.redirect("/auth/login"); // Redirect to the login page if the user is not authenticated
  } else {
    res.render("dashboard.ejs", { user: req.user }); // Pass the 'user' object to the view
  }
});

// Other routes and logic as needed

module.exports = router;
