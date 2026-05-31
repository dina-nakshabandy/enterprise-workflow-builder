const prisma = require("../../../config/prisma");

const createWorkflowRequest = async ({
  workflowTemplateId,
  userId,
  payload,
}) => {
  const template = await prisma.workflowTemplate.findUnique({
    where: { id: workflowTemplateId },
    include: {
      steps: true,
    },
  });

  if (!template) {
    const error = new Error("Workflow template not found");
    error.statusCode = 404;
    throw error;
  }

  if (!template.steps.length) {
    const error = new Error("Workflow template has no approval steps");
    error.statusCode = 400;
    throw error;
  }

  const workflowRequest = await prisma.workflowRequest.create({
    data: {
      workflowTemplateId,
      createdById: userId,
      payload,
      status: "PENDING",
      currentStep: 1,
    },
  });

  return {
    message: "Workflow request submitted successfully",
    workflowRequest,
  };
};

module.exports = {
  createWorkflowRequest,
};
