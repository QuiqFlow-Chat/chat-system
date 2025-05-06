// src/services/authService.ts
import { apiPost } from '../../utils/apiUtils';
import tokenStorage from '../../utils/storage';
import { UserLoginParameters,AuthResponse, UserCreateParameters } from '../../shared/dtosInterfaces/userDtos';

// LogIn
export const login = async (credentials: UserLoginParameters) => {
  const response = await apiPost<AuthResponse, UserLoginParameters>('/login', credentials);
  // localStorage
  tokenStorage.save(response.token);
  
  return response.user;
};

export const signUp = async (userData: UserCreateParameters) => {
  const response = await apiPost<AuthResponse, UserCreateParameters>('/register', userData);

  return response.user;
};

export const logout = () => {
  tokenStorage.clear();
};

// التحقق من وجود توكن (للاستخدام في واجهات المستخدم أو التنقل)
export const isAuthenticated = (): boolean => {
  return !!tokenStorage.load();
};
