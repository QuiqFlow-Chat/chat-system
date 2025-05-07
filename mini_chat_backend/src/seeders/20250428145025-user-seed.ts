'use strict';
import { QueryInterface } from 'sequelize';
import users from '../data/users.json';
import bcrypt from 'bcrypt';

// Define the seed function type
type SeedFn<T> = (options: { context: T }) => Promise<void>;

export const up: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, 10),
    }))
  );

  await queryInterface.bulkInsert('Users', hashedUsers, {});
};

export const down: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('Users', {}, {});
};
