const express = require("express");

const {
  authenticate,
} = require("../../../middlewares/auth.middleware");

const {
  createWorkflowRequest,
  approveWorkflowRequest,
  getPendingApprovals,
  rejectWorkflowRequest,
  getMyRequests,
  getWorkflowRequestById
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

router.get(
  "/pending",
  authenticate,
  getPendingApprovals 
)

router.post(
  "/:id/reject",
  authenticate,
  rejectWorkflowRequest
);

router.get(
  "/my-requests",
  authenticate,
  getMyRequests
)

router.get(
  "/:id",
  authenticate,
  getWorkflowRequestById
);

module.exports = router;