// src/services/authService.ts
import { apiPost } from '../utils/api/apiUtils';
import  { tokenStorage, userStorage } from '../utils/storage';
import { UserLoginParameters,AuthResponse, UserCreateParameters } from '../shared/dtosInterfaces/userDtos';

// LogIn
export const login = async (credentials: UserLoginParameters) => {
  const response = await apiPost<AuthResponse, UserLoginParameters>('/login', credentials);
  // localStorage
  userStorage.save(response.data.user);
  console.log("for storage",response.data.user)
  tokenStorage.save(response.data.token);

  return response.data.user;
};

export const signUp = async (userData: UserCreateParameters) => {
  const response = await apiPost<AuthResponse, UserCreateParameters>('/register', userData);

  return response.message;
};

export const logout = () => {
  tokenStorage.clear();
  userStorage.clear();
};

export const isAuthenticated = (): boolean => {
  return !!tokenStorage.load();
};

export const getLoggedInUser = () => {
  return userStorage.load();
};

export const getToken = (): string | null => {
  return tokenStorage.load();
};