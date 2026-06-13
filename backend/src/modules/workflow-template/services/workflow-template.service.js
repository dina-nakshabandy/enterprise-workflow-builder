const prisma = require("../../../config/prisma");

const createWorkflowTemplate = async ({ name, description, steps }) => {
  const workflowTemplate = await prisma.$transaction(async (tx) => {
    const template = await tx.workflowTemplate.create({
      data: {
        name,
        description,
      },
    });

    await tx.workflowStep.createMany({
      data: steps.map((step) => ({
        workflowTemplateId: template.id,
        stepOrder: step.stepOrder,
        role: step.role,
      })),
    });

    return template;
  });

  return {
    message: "Workflow template created successfully",
    workflowTemplate,
  };
};

const getWorkflowTemplates = async () => {
  return prisma.workflowTemplate.findMany({
    where: {
      isActive: true,
    },
    include: {
      steps: {
        orderBy: {
          stepOrder: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

module.exports = {
  createWorkflowTemplate,
  getWorkflowTemplates,
};
