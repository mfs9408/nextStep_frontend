export interface CreateUserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  primaryRole: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}
