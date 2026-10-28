export interface ISignupDto {
  username: string;
  email: string;
  password: string;
  phone: string;
  confirmPassword?: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}
