const workflowTemplateService = require("../services/workflow-template.service");

const createWorkflowTemplate = async (req, res) => {
  try {
    const result = await workflowTemplateService.createWorkflowTemplate(
      req.body,
    );

    res.status(201).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const getWorkflowTemplates = async (req, res) => {
  try {
    const templates = await workflowTemplateService.getWorkflowTemplates();

    res.status(200).json(templates);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createWorkflowTemplate,
  getWorkflowTemplates,
};
