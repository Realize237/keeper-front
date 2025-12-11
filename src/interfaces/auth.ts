
export const FORGOT_PASSWORD_STEPS = {
  PASSWORD_REQUEST: "password-request",
  OTP: "otp",
  PASSWORD_RESET: "password-reset"
};

export type ForgotPasswordStepsType = keyof typeof FORGOT_PASSWORD_STEPS;