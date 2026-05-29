const authService = require("../services/auth.service");

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  register,
  login,
};