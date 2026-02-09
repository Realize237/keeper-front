import { useMutation } from '@tanstack/react-query';
import { createReview } from '../services/reviewsService';
import { Review } from '../interfaces/reviews';

export const useCreateReview = () => {
  return useMutation<unknown, Error, Review>({
    mutationFn: (review: Review) => createReview(review),
  });
};
