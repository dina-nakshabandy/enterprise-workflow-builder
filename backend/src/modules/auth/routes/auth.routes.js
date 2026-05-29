const express = require("express");

const { register, login } = require("../controllers/auth.controller");
const validate = require("../../../middlewares/validation.middleware");
const router = express.Router();
const {
  registerSchema,
  loginSchema,
} = require("../../../validators/auth.validator");

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);
module.exports = router;
