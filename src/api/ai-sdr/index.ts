import axios from "src/utils/functions/axios";
import { ICommentRequest, ICreateSocial } from "src/utils/types/social-selling";

class AiSdrApi {
  async deleteWorkflow(wid: number) {
    const response = await axios(true).post(
      `${process.env.REACT_APP_WORKFLOW_API_URL}/workflow/${wid}/delete`
    );
    return response;
  }
}

export const aiSdrApi = new AiSdrApi();
