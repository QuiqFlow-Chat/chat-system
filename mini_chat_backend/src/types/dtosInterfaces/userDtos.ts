export interface IUserAttributes {
  id: string;
  fullName: string;
  email: string;
  password: string;
  lastActivity: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreateParameters {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserLoginParameters {
  email: string;
  password: string;
}

export interface IUserGetByParameter {
  id: string;
}

export interface IUserUpdateParameters {
  id: string;
  fullName: string;
  password: string;
}

export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
}
