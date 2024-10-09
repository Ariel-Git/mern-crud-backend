export interface UserRegistrationBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserUpdateBody {
  firstname: string;
  lastname: string;
  email: string;
}

export interface changePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface UserParams {
  id: number;
}
export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
