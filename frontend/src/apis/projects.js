import axios from "../config/axiosConfig";

export const createProjectApi = async (
  projectName,
  template,
  description,
  apikey
) => {
  try {
    const response = await axios.post("/api/v1/projects", {
      projectName,
      template,
      description,
      apikey,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getProjectTreeApi = async (projectId) => {
  try {
    const response = await axios.get(`/api/v1/projects/${projectId}/tree`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project tree:", error);
    throw error;
  }
};
