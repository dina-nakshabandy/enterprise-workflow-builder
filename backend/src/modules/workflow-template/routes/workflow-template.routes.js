const express = require("express");

const {
  authenticate,
} = require("../../../middlewares/auth.middleware");

const {
  authorizeRoles,
} = require("../../../middlewares/rbac.middleware");

const {
  createWorkflowTemplate,
} = require("../controllers/workflow-template.controller");

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorizeRoles("ADMIN"),
  createWorkflowTemplate
);

module.exports = router;