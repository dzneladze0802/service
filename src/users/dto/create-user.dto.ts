export interface ICreateUserDto {
  name: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  gender: 'MALE' | 'FEMALE';
}
