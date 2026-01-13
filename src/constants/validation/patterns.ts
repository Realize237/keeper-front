export const PASSWORD_RULES = {
  MIN_LENGTH: 8,
  REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NAME_RULES = {
  REGEX: /^[a-zA-Z\s]+$/,
  MIN_LENGTH: 2,
};
