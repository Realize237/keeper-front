/* eslint-disable react-hooks/set-state-in-effect */
import { Input } from '../ui/Input';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import FormButton from '../ui/FormButton';
import Modal from '../ui/Modal';

interface OtpProps {
  onSubmit: (code: string) => void;
  onResend: () => void;
  onClose: () => void;
  isOpen: boolean;
  isSubmitting: boolean;
}

export default function OTPVerification({
  onSubmit,
  onResend,
  onClose,
  isOpen,
  isSubmitting = false,
}: OtpProps) {
  const [otp, setOtp] = useState<string[]>(Array(5).fill(''));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(120);
  const [isResendAvailable, setIsResendAvailable] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      setSecondsLeft(120);
      setIsResendAvailable(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsResendAvailable(true);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = () => {
    if (!isResendAvailable) return;
    onResend();
    setSecondsLeft(120);
    setIsResendAvailable(false);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      const values = value.slice(0, 6 - index).split('');
      for (let i = 0; i < values.length; i++) {
        newOtp[index + i] = values[i];
      }
      setOtp(newOtp);
      const nextIndex = index + values.length < 6 ? index + values.length : 5;
      inputsRef.current[nextIndex]?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((v) => v === '')) return;
    onSubmit(otp.join(''));
  };

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('auth.otp.title')}
      width="max-w-sm"
    >
      <p className="text-gray-400 text-sm mb-4">{t('auth.otp.description')}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between space-x-3">
          {otp.map((value, i) => (
            <Input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={5}
              value={value}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="text-white w-full text-center rounded-lg"
            />
          ))}
        </div>

        <FormButton
          type="submit"
          isLoading={isSubmitting}
          className="w-full mt-7"
          size="lg"
        >
          {t('auth.otp.actions.submit')}
        </FormButton>
      </form>

      <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
        <span>
          {isResendAvailable
            ? t('auth.otp.resend.available')
            : t('auth.otp.resend.wait', { time: formatTime(secondsLeft) })}
        </span>
        <button
          onClick={handleResend}
          disabled={!isResendAvailable}
          className={`text-sm font-semibold ${
            isResendAvailable
              ? 'text-blue-500 hover:underline'
              : 'text-gray-500 cursor-not-allowed'
          }`}
        >
          {t('auth.otp.resend.button')}
        </button>
      </div>
    </Modal>
  );
}
