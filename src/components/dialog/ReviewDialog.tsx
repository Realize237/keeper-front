import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa6';
import { IoSend } from 'react-icons/io5';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { useCreateReview } from '../../hooks/useReviews';
import { cn } from '../../utils/cn';

interface ReviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (rating: number, message: string) => void;
  title?: string;
  submitText?: string;
}

type RatingState = {
  rating: number;
  hoveredRating: number;
  message: string;
};

const RATING_CONFIG = {
  0.5: { key: 'review.rating0_5', color: 'text-red-500' },
  1: { key: 'review.rating1', color: 'text-red-500' },
  1.5: { key: 'review.rating1_5', color: 'text-red-500' },
  2: { key: 'review.rating2', color: 'text-red-500' },

  2.5: { key: 'review.rating2_5', color: 'text-yellow-500' },
  3: { key: 'review.rating3', color: 'text-yellow-500' },
  3.5: { key: 'review.rating3_5', color: 'text-yellow-500' },
  4: { key: 'review.rating4', color: 'text-green-500' },

  4.5: { key: 'review.rating4_5', color: 'text-green-500' },
  5: { key: 'review.rating5', color: 'text-green-500' },
} as const;

const getRatingColor = (rating: number) => {
  if (rating <= 2) return 'red';
  if (rating < 4) return 'yellow';
  return 'green';
};

export function ReviewDialog({
  isOpen,
  onClose,
  title,
  submitText,
}: ReviewDialogProps) {
  const [ratingState, setRatingState] = useState<RatingState>({
    rating: 0,
    hoveredRating: 0,
    message: '',
  });

  const { rating, hoveredRating, message } = ratingState;
  const ratingConfig = RATING_CONFIG[rating as keyof typeof RATING_CONFIG];

  const { t } = useTranslation();

  const updateRatingState = (newValues: Partial<typeof ratingState>) => {
    setRatingState((prev) => ({
      ...prev,
      ...newValues,
    }));
  };

  const {
    mutate: createReview,
    isPending: isSubmitting,
    isSuccess,
  } = useCreateReview();

  const getStarState = (starIndex: number, currentRating: number) => {
    if (currentRating >= starIndex) return 'full';
    if (currentRating >= starIndex - 0.5) return 'half';
    return 'empty';
  };

  const ratingColor = getRatingColor(rating);

  const handleStarClick = (starIndex: number, isLeftHalf: boolean) => {
    const newRating = isLeftHalf ? starIndex - 0.5 : starIndex;
    updateRatingState({ rating: newRating });
  };

  const handleStarHover = (starIndex: number, isLeftHalf: boolean) => {
    const newRating = isLeftHalf ? starIndex - 0.5 : starIndex;
    updateRatingState({ hoveredRating: newRating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      return;
    }

    createReview(
      {
        rating: Number(rating),
        comment: message,
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            handleClose();
          }, 2000);
        },
        onError: (error: Error) => {
          toast.error(error.message || t('review.errorMessage'));
        },
      }
    );
  };

  const handleClose = () => {
    updateRatingState({
      rating: 0,
      hoveredRating: 0,
      message: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={!isSuccess ? title || t('review.title') : undefined}
      width="max-w-lg"
    >
      {!isSuccess ? (
        <>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-gradient  rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-danger/30">
              <FaStar className="w-8 h-8 text-white fill-primary-foreground" />
            </div>
            <p className="text-foreground font-medium">
              {t('review.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground text-center">
                {t('review.rateLabel')}
              </label>
              <div className="flex justify-center gap-2">
                {Array(5)
                  .fill(0)
                  .map((_, index) => {
                    const currentRating = hoveredRating || rating;
                    const starState = getStarState(index + 1, currentRating);

                    return (
                      <motion.div
                        key={index}
                        className={cn(
                          'relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-app rounded-lg p-1',
                          `focus:ring-${ratingColor}-500`
                        )}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2, ease: 'easeOut' },
                        }}
                        whileTap={{
                          scale: 0.98,
                          transition: { duration: 0.1 },
                        }}
                      >
                        <div
                          className="absolute inset-0 w-1/2 z-10"
                          onClick={() => handleStarClick(index + 1, true)}
                          onMouseEnter={() => handleStarHover(index + 1, true)}
                          onMouseLeave={() =>
                            updateRatingState({ hoveredRating: 0 })
                          }
                        />

                        <div
                          className="absolute inset-0 left-1/2 w-1/2 z-10"
                          onClick={() => handleStarClick(index + 1, false)}
                          onMouseEnter={() => handleStarHover(index + 1, false)}
                          onMouseLeave={() =>
                            updateRatingState({ hoveredRating: 0 })
                          }
                        />

                        <div className="relative">
                          <FaStar
                            className="w-10 h-10 md:w-12 md:h-12 text-foreground transition-all duration-300"
                            style={{
                              fill: 'none',
                              stroke: 'currentColor',
                              strokeWidth: 2.5,
                            }}
                          />

                          {starState !== 'empty' && (
                            <FaStar
                              className={cn(
                                'absolute inset-0 w-10 h-10 md:w-12 md:h-12 transition-all duration-300',
                                `text-${ratingColor}-500`
                              )}
                              style={{
                                fill: 'currentColor',
                                stroke: 'currentColor',
                                strokeWidth: 0,
                                clipPath:
                                  starState === 'half'
                                    ? 'inset(0 50% 0 0)'
                                    : 'none',
                              }}
                            />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
              {rating > 0 && (
                <motion.p
                  className={cn(
                    'text-center mt-3 text-sm font-semibold',
                    ratingConfig?.color
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  key={rating}
                >
                  {ratingConfig && t(ratingConfig.key)}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                {t('review.messageLabel')}
              </label>
              <textarea
                value={message}
                onChange={(e) => updateRatingState({ message: e.target.value })}
                placeholder={t('review.messagePlaceholder')}
                rows={4}
                className="w-full bg-surface text-surface-foreground placeholder-muted-foreground rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary border-border resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={rating === 0}
              isLoading={isSubmitting}
              className="mb-0"
              size="lg"
            >
              <span className="flex items-center justify-center gap-3">
                {!isSubmitting && <IoSend className="w-5 h-5" />}
                {submitText || t('review.submit')}
              </span>
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-linear-to-br from-accent/90 to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg
              className="w-10 h-10 text-accent-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t('review.successTitle')}
          </h3>
          <p className="text-foreground">{t('review.successMessage')}</p>
        </div>
      )}
    </Modal>
  );
}
