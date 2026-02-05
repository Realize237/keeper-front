import { API_PATHS } from '../api/api-paths';
import { ApiSuccessResponse } from '../interfaces/api';
import { Review } from '../interfaces/reviews';
import { axiosClient } from '../lib/axiosClient';
import { processError } from '../utils';
import { env } from '../utils/env';

export const createReview = async (review: Review) => {
  try {
    const response = await axiosClient.post<ApiSuccessResponse>(
      `${env.API_URL}${API_PATHS.REVIEWS.CREATE_REVIEW}`,
      {
        ...review,
      }
    );

    return response.data;
  } catch (err: unknown) {
    return processError(err);
  }
};
