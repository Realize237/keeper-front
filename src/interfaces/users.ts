export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  photo: string | null;
  created_at: Date;
}

const user: User = {
    id: 1,
    name: '',
    email:'',
    password: '',
    photo: null,
    created_at: new Date()
} 

export type UserInput = Omit<User, 'id'| 'photo' | 'created_at'>;

export type UserLoginInput = Omit<UserInput, 'name'>;

export type UserResponse = Omit<User, 'password'>;
