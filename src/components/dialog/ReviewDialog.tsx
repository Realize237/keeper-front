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

export function ReviewDialog({
  isOpen,
  onClose,
  title,
  submitText,
}: ReviewDialogProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { t } = useTranslation();

  const { mutate: createReview, isPending: isSubmitting } = useCreateReview();

  const getStarState = (starIndex: number, currentRating: number) => {
    if (currentRating >= starIndex) return 'full';
    if (currentRating >= starIndex - 0.5) return 'half';
    return 'empty';
  };

  const handleStarClick = (starIndex: number, isLeftHalf: boolean) => {
    const newRating = isLeftHalf ? starIndex - 0.5 : starIndex;
    setRating(newRating);
  };

  const handleStarHover = (starIndex: number, isLeftHalf: boolean) => {
    const newRating = isLeftHalf ? starIndex - 0.5 : starIndex;
    setHoveredRating(newRating);
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
          setSubmitted(true);

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
    setRating(0);
    setHoveredRating(0);
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={!submitted ? title || t('review.title') : undefined}
      width="max-w-lg"
    >
      {!submitted ? (
        <>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-br from-primary to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/30">
              <FaStar className="w-8 h-8 text-white fill-white" />
            </div>
            <p className="text-gray-400 font-medium">{t('review.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300 text-center">
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
                          rating <= 2
                            ? 'focus:ring-red-500'
                            : rating >= 2.5 && rating < 4
                              ? 'focus:ring-yellow-500'
                              : 'focus:ring-green-500'
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
                          onMouseLeave={() => setHoveredRating(0)}
                        />

                        <div
                          className="absolute inset-0 left-1/2 w-1/2 z-10"
                          onClick={() => handleStarClick(index + 1, false)}
                          onMouseEnter={() => handleStarHover(index + 1, false)}
                          onMouseLeave={() => setHoveredRating(0)}
                        />

                        <div className="relative">
                          <FaStar
                            className="w-10 h-10 md:w-12 md:h-12 text-gray-300 transition-all duration-300"
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
                                rating <= 2
                                  ? 'text-red-500'
                                  : rating >= 2.5 && rating < 4
                                    ? 'text-yellow-500'
                                    : 'text-green-500'
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
                    rating <= 2
                      ? 'text-red-500'
                      : rating >= 2.5 && rating < 4
                        ? 'text-yellow-500'
                        : 'text-green-500'
                  )}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  key={rating}
                >
                  {rating === 0.5 && t('review.rating0_5')}
                  {rating === 1 && t('review.rating1')}
                  {rating === 1.5 && t('review.rating1_5')}
                  {rating === 2 && t('review.rating2')}
                  {rating === 2.5 && t('review.rating2_5')}
                  {rating === 3 && t('review.rating3')}
                  {rating === 3.5 && t('review.rating3_5')}
                  {rating === 4 && t('review.rating4')}
                  {rating === 4.5 && t('review.rating4_5')}
                  {rating === 5 && t('review.rating5')}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                {t('review.messageLabel')}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('review.messagePlaceholder')}
                rows={4}
                className="w-full bg-surface text-white placeholder-gray-500 rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-primary border-border resize-none"
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
          <div className="w-20 h-20 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg
              className="w-10 h-10 text-white"
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
          <h3 className="text-2xl font-bold text-white mb-2">
            {t('review.successTitle')}
          </h3>
          <p className="text-gray-400">{t('review.successMessage')}</p>
        </div>
      )}
    </Modal>
  );
}
