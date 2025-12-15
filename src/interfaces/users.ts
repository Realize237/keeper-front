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

export type UserInput = Omit<User, "id" | "photo" | "created_at" | "authType">;

export type UserLoginInput = Omit<UserInput, "name">;

export type UserResponse = Omit<User, "password">;

export type UserUpdateInput = Partial<UserInput>;
