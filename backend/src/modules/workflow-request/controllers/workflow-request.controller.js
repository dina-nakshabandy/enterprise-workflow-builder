const workflowRequestService = require(
  "../services/workflow-request.service"
);

const createWorkflowRequest = async (req, res) => {
  try {
    console.log({req})
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

module.exports = {
  createWorkflowRequest,
};