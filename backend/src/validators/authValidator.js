const { check } = require("express-validator");

exports.registerValidator = [
  check("username", "Username is required").notEmpty(),
  check("email", "Valid email is required").isEmail(),
  check("password", "Password must be 6+ characters").isLength({ min: 6 }),
];

exports.loginValidator = [check("email", "Valid email is required").isEmail(), check("password", "Password is required").notEmpty()];
