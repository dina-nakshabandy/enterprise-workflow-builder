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

const approveWorkflowRequest = async ({
  workflowRequestId,
  userId,
  role,
  comments,
}) => {
  const workflowRequest = await prisma.workflowRequest.findUnique({
    where: { id: workflowRequestId },
    include: {
      workflowTemplate: {
        include: {
          steps: {
            orderBy: {
              stepOrder: "asc",
            },
          },
        },
      },
    },
  });

  if (!workflowRequest) {
    const error = new Error("Workflow request not found");
    error.statusCode = 404;
    throw error;
  }

  if (workflowRequest.status !== "PENDING") {
    const error = new Error("Workflow request is already completed");
    error.statusCode = 400;
    throw error;
  }

  const currentStep = workflowRequest.workflowTemplate.steps.find(
    (step) => step.stepOrder === workflowRequest.currentStep,
  );

  if (!currentStep) {
    const error = new Error("Current approval step not found");
    error.statusCode = 400;
    throw error;
  }

  if (currentStep.role !== role) {
    const error = new Error("You are not allowed to approve this step");
    error.statusCode = 403;
    throw error;
  }

  const nextStep = workflowRequest.workflowTemplate.steps.find(
    (step) => step.stepOrder === workflowRequest.currentStep + 1,
  );

  const result = await prisma.$transaction(async (tx) => {
    await tx.workflowApproval.create({
      data: {
        workflowRequestId,
        approvedById: userId,
        decision: "APPROVED",
        comments,
      },
    });

    const updatedRequest = await tx.workflowRequest.update({
      where: { id: workflowRequestId },
      data: nextStep
        ? {
            currentStep: nextStep.stepOrder,
            status: "PENDING",
          }
        : {
            status: "APPROVED",
          },
    });

    return updatedRequest;
  });

  return {
    message: nextStep
      ? "Workflow step approved successfully"
      : "Workflow request fully approved",
    workflowRequest: result,
  };
};

const getPendingApprovals = async (role) => {
  const workflowRequests = await prisma.workflowRequest.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      createdBy: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      workflowTemplate: {
        include: {
          steps: true,
        },
      },
    },
  });

  const pendingApprovals = workflowRequests.filter((workflowRequest) => {
    const currentStep = workflowRequest.workflowTemplate.steps.find(
      (step) => step.stepOrder === workflowRequest.currentStep,
    );

    return currentStep?.role === role;
  });
  return pendingApprovals;
};

const rejectWorkflowRequest = async ({
  workflowRequestId,
  userId,
  role,
  comments,
}) => {
  const workflowRequest = await prisma.workflowRequest.findUnique({
    where: { id: workflowRequestId },
    include: {
      workflowTemplate: {
        include: {
          steps: true,
        },
      },
    },
  });

  if (!workflowRequest) {
    const error = new Error("Workflow request not found");
    error.statusCode = 404;
    throw error;
  }

  if (workflowRequest.status !== "PENDING") {
    const error = new Error("Workflow request is already completed");
    error.statusCode = 400;
    throw error;
  }

  const currentStep = workflowRequest.workflowTemplate.steps.find(
    (step) => step.stepOrder === workflowRequest.currentStep,
  );

  if (!currentStep) {
    const error = new Error("Current approval step not found");
    error.statusCode = 400;
    throw error;
  }

  if (currentStep.role !== role) {
    const error = new Error("You are not allowed to reject this step");
    error.statusCode = 403;
    throw error;
  }

  const result = await prisma.$transaction(async (tx) => {
    await tx.workflowApproval.create({
      data: {
        workflowRequestId,
        approvedById: userId,
        decision: "REJECTED",
        comments,
      },
    });

    const updatedRequest = await tx.workflowRequest.update({
      where: { id: workflowRequestId },
      data: {
        status: "REJECTED",
      },
    });

    return updatedRequest;
  });

  return {
    message: "Workflow request rejected successfully",
    workflowRequest: result,
  };
};

const getMyRequests = async (userId) => {
  return prisma.workflowRequest.findMany({
    where: {
      createdById: userId,
    },
    include: {
      workflowTemplate: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getWorkflowRequestById = async (workflowRequestId) => {
  const workflowRequest = await prisma.workflowRequest.findUnique({
    where: {
      id: workflowRequestId,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
        },
      },
      workflowTemplate: {
        include: {
          steps: {
            orderBy: {
              stepOrder: "asc",
            },
          },
        },
      },
      approvals: {
        include: {
          approvedBy: {
            select: {
              id: true,
              fullName: true,
              email: true,
              role: true,
            },
          },
        },
        orderBy: {
          approvedAt: "asc",
        },
      },
    },
  });

  if (!workflowRequest) {
    const error = new Error("Workflow request not found");
    error.statusCode = 404;
    throw error;
  }
  return workflowRequest;
};

module.exports = {
  createWorkflowRequest,
  approveWorkflowRequest,
  getPendingApprovals,
  rejectWorkflowRequest,
  getMyRequests,
  getWorkflowRequestById,
};
