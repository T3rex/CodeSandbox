import axios from "../config/axiosConfig";

export const createProjectApi = async (projectName, template) => {
  try {
    const response = await axios.post(
      "/api/v1/projects",
      {
        projectName,
        template,
      },
      { timeout: 15000 }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
