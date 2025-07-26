import { createProjectService } from "../service/ProjectService.js";

export const createProject = async (req, res) => {
  try {
    const { projectName, template } = req.body;
    const response = await createProjectService(projectName, template);
    const projectId = response;
    return res
      .status(200)
      .json({ message: "Project created successfully", data: { projectId } });
  } catch (error) {
    console.error("Error creating project:", error.message);
    return res.status(500).json({
      error: "Vite project creation failed",
      message: error.message,
    });
  }
};
