'use strict';
import { QueryInterface } from 'sequelize';
import messages from '../data/messages.json';

// Define the seed function type
type SeedFn<T> = (options: { context: T }) => Promise<void>;

export const up: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('Messages', messages, {});
};

export const down: SeedFn<QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('Messages', {}, {});
};
