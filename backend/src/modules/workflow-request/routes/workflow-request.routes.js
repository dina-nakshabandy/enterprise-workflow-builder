const express = require("express");

const {
  authenticate,
} = require("../../../middlewares/auth.middleware");

const {
  createWorkflowRequest,
  approveWorkflowRequest,
} = require("../controllers/workflow-request.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  createWorkflowRequest
);

router.post(
  "/:id/approve",
  authenticate,
  approveWorkflowRequest
);

module.exports = router;