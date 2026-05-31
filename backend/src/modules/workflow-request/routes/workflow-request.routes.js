const express = require("express");

const {
  authenticate,
} = require("../../../middlewares/auth.middleware");

const {
  createWorkflowRequest,
} = require("../controllers/workflow-request.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  createWorkflowRequest
);

module.exports = router;