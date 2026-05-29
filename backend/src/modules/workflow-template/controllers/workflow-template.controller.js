const workflowTemplateService = require("../services/workflow-template.service");

const createWorkflowTemplate = async (req, res) => {
  try {
    const result = await workflowTemplateService.createWorkflowTemplate(
      req.body
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createWorkflowTemplate,
};