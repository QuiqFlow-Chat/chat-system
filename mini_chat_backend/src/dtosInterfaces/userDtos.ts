export interface UserCreateParameters {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLoginParameters {
  email: string;
  password: string;
}

export interface UserGetByParameter {
  id: string;
}

export interface UserUpdateParameters {
  id: string;
  fullName: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
}

