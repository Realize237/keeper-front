export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  authType: string;
  photo: string | null;
  created_at: Date | string;
  language: string;
  acceptedPrivacyPolicy?: boolean;
  userConsentAccepted?: boolean;
}

export interface IEmailPasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ISetPasswordInput = Pick<
  IEmailPasswordInput,
  'newPassword' | 'confirmPassword'
> & {
  token: string;
};

export type UserInput = Pick<
  User,
  | 'name'
  | 'email'
  | 'password'
  | 'acceptedPrivacyPolicy'
  | 'userConsentAccepted'
> & {
  language?: string;
};
export type PasswordRequestInput = Pick<User, 'email'>;
export interface IValidateToken extends PasswordRequestInput {
  token: string;
}

export interface IResetPassword extends PasswordRequestInput {
  newPassword: string;
}

export type UserLoginInput = Pick<User, 'email' | 'password'>;

export type UserResponse = Omit<User, 'password'>;

export type UserUpdateInput = Partial<UserInput>;

export type ResendVerificationPayload = { email: string } | { token: string };
