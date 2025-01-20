import axios from "src/utils/functions/axios";

class AutomationApi {
  async getAutomationsList() {
    const response = await axios(true).get(
      `${process.env.REACT_APP_WORKFLOW_API_URL}/workflow/`,
      {}
    );
    return response;
  }

  async deleteAutomationProcessFromList(id: number) {
    try {
      const response = await axios(true).post(
        `${process.env.REACT_APP_WORKFLOW_API_URL}/workflow/${id}/delete`,
        {}
      );
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to delete process");
      }
    } catch (error) {
      throw new Error(`Error deleting process: ${error.message}`);
    }
  }
}

export const automationApi = new AutomationApi();
