import {
  UserCreateParameters,
  UserGetByParameter,
  UserLoginParameters,
  UserUpdateParameters,
} from '../dtosInterfaces/userDtos';
import Conversation from '../models/Conversation';
import User from '../models/User';
import UserConversation from '../models/UserConversation';
import { UserRepository } from './../repositories/userRepository';
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  public registerAsync = async (parameters: UserCreateParameters): Promise<void> => {
    try {
      if (
        !parameters.fullName ||
        !parameters.email ||
        !parameters.password ||
        !parameters.confirmPassword
      )
        throw new Error('full name , email , password and confirm password are required');
      const users = await this._userRepository.getAllAsync();
      const checkedUsers = users.filter(
        (u) => u.fullName === parameters.fullName && u.email === parameters.email
      );
      if (checkedUsers.length > 0) throw new Error('this user already exist');
      if (parameters.password !== parameters.confirmPassword)
        throw new Error('password and confirm password must be a same');
      await this._userRepository.addAsync(parameters);
    } catch (error) {
      console.log('Error in registerAsync', error);
      throw new Error('Faild to register user');
    }
  };

  public LoginAsync = async (parameters: UserLoginParameters): Promise<User> => {
    try {
      const users = await this._userRepository.getAllAsync();
      const checkUser = users.filter(
        (u) => u.email === parameters.email && u.password === parameters.password
      );
      if (checkUser.length === 0) throw new Error('this user can not valid to login');
      return checkUser[0];
    } catch (error) {
      console.log('Error in loginAsync', error);
      throw new Error('Faild to login user');
    }
  };

  public getAllUsersAsync = async (): Promise<User[]> => {
    try {
      const users = await this._userRepository.getAllAsync();
      if (users.length === 0) throw new Error('users not found');
      return users;
    } catch (error) {
      console.log('Error in getAllAsync', error);
      throw new Error('Faild to get all users');
    }
  };

  public getUserByIdAsync = async (parameter: UserGetByParameter): Promise<User> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error('user not found');
      return user;
    } catch (error) {
      console.log('Error in getUserByIdAsync', error);
      throw new Error('Faild to get user');
    }
  };

  public deleteUserAsync = async (parameter: UserGetByParameter): Promise<void> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error('user not found');
      await this._userRepository.deleteAsync(user);
    } catch (error) {
      console.log('Error in deleteUserAsync', error);
      throw new Error('Faild to delete user');
    }
  };

  public updateUserAsync = async (parameter: UserUpdateParameters): Promise<void> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error('user not found');
      if (!parameter.fullName && !parameter.password)
        throw new Error('please enter at lest one field');
      user.fullName = parameter.fullName || user.fullName;
      user.password = parameter.password || user.password;
      await this._userRepository.updateAsync(user);
    } catch (error) {
      console.log('Error in updateUserAsync', error);
      throw new Error('Faild to update user');
    }
  };

  public LogoutAsync = async (parameter: UserGetByParameter): Promise<Date> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error('user not found');
      user.lastActivity = new Date(Date.now());
      await this._userRepository.updateAsync(user);
      return user.lastActivity;
    } catch (error) {
      console.log('Error in logouAsync', error);
      throw new Error('Faild to logout user');
    }
  };

  public getUserConversationsAsync = async (
    parameter: UserGetByParameter
  ): Promise<Conversation[]> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error('user not found');
      return user.conversations;
    } catch (error) {
      console.log('Error in getUserConversationsAsync', error);
      throw new Error('Faild to get user conversations');
    }
  };
}
