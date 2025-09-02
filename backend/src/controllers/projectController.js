import {
  createProjectService,
  getProjectTreeService,
} from "../service/ProjectService.js";

export const createProject = async (req, res) => {
  try {
    const { projectName, template, description } = req.body;
    const response = await createProjectService(
      projectName,
      template,
      description
    );
    const { projectId, projectStructure } = response;
    return res.status(200).json({
      message: "Project created successfully",
      data: { projectId, projectStructure },
    });
  } catch (error) {
    console.error("Error creating project:", error.message);
    return res.status(500).json({
      error: "Vite project creation failed",
      message: error.message,
    });
  }
};

export const getProjectTree = async (req, res) => {
  try {
    const tree = await getProjectTreeService(req.params.projectId);
    return res.status(200).json({
      data: tree,
      success: true,
      message: "Successfully fetched the tree",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while generating tree", message: error.message });
  }
};
