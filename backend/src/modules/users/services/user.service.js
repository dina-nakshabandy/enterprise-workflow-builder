const prisma = require("../../../config/prisma");

const getCurrentUser = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      isActive: true,
    },
  });
};

module.exports = {
  getCurrentUser,
};