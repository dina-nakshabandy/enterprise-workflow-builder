const express = require("express");
const {createWorkflowTemplate} = require("../controllers/workflow-template.controller");
const router = express.Router();

router.post("/", createWorkflowTemplate);

module.exports = router;
