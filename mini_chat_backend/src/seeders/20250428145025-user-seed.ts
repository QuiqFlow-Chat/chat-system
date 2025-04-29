'use strict';
import { QueryInterface } from 'sequelize';
import users from '../data/users.json';

// Define the seed function type
type SeedFn<T> = (options: { context: T }) => Promise<void>;

export const up: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('Users', users, {});
};

export const down: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('Users', {}, {});
};
