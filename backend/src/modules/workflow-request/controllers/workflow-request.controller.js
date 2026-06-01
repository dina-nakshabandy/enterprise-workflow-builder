const workflowRequestService = require("../services/workflow-request.service");

const createWorkflowRequest = async (req, res) => {
  try {
    const result =
      await workflowRequestService.createWorkflowRequest({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const approveWorkflowRequest = async (req, res) => {
  try {
    const result = await workflowRequestService.approveWorkflowRequest({
      workflowRequestId: req.params.id,
      userId: req.user.id,
      role: req.user.role,
      comments: req.body.comments,
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const getPendingApprovals = async (req, res) => {
  try {
    const result =
      await workflowRequestService.getPendingApprovals(
        req.user.role
      );

    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const rejectWorkflowRequest = async (req, res) => {
  try {
    const result =
      await workflowRequestService.rejectWorkflowRequest({
        workflowRequestId: req.params.id,
        userId: req.user.id,
        role: req.user.role,
        comments: req.body.comments,
      });

    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createWorkflowRequest,
  approveWorkflowRequest,
  getPendingApprovals,
  rejectWorkflowRequest,
};