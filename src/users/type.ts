export interface IUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  createdAt: Date;
  gender: 'MALE' | 'FEMALE';
}
