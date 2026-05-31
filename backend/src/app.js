const express = require("express");
const cors = require("cors");
const workflowTemplateRoutes = require("./modules/workflow-template/routes/workflow-template.routes");
const workflowRequestsRoutes = require("./modules/workflow-request/routes/workflow-request.routes");
const authRoutes = require("./modules/auth/routes/auth.routes");

const app = express();

const userRoutes = require("./modules/users/routes/user.routes");

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "enterprise-workflow-builder-api",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/workflow-templates", workflowTemplateRoutes);
app.use("/api/workflow-requests", workflowRequestsRoutes);
module.exports = app;
