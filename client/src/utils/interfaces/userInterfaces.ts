export interface UserRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface DBUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEnabled: boolean;
}

export interface UserPropsIndexable {
  [key: string]: string | number | boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEnabled: boolean;
}
