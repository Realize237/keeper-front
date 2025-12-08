import { processError } from "../utils";
import axios from "axios";
import { API_PATHS } from "./api-paths";
import { env } from "../utils/env";
import { Subscription } from "../interfaces/subscription";

export const getAllUserSubscriptions = async () => {
  try {
    const response = await axios.get<Subscription[]>(
      `${env.API_URL}${API_PATHS.SUBSCRIPTIONS.GET_ALL_SUBSCRIPTIONS}`,
      {
        withCredentials: true, 
      }
    );
    

    return response.data.data;
  } catch (err: any) {
    return processError(err);
  }
};




