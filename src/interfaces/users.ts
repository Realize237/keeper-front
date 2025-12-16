export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  authType: string;
  photo: string | null;
  created_at: Date | string;
}

export interface IEmailPasswordInput {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type UserInput = Pick<User, 'name' | 'email' | 'password'>;

export type UserLoginInput = Omit<UserInput, 'name'>;

export type UserResponse = Omit<User, 'password'>;

export type UserUpdateInput = Partial<UserInput>;
