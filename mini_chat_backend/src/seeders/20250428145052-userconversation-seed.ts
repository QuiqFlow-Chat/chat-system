'use strict';
import { QueryInterface } from 'sequelize';
import userConversations from '../data/userConversations.json';

// Define the seed function type
type SeedFn<T> = (options: { context: T }) => Promise<void>;

export const up: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('UserConversations', userConversations, {});
};

export const down: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('UserConversations', {}, {});
};
