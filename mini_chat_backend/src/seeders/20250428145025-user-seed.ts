'use strict';

import bcrypt from 'bcrypt';
import users from '@/data/users.json';
import { QueryInterfaceSeedFn } from '@/types/seedTypes';
import { DB_CONSTANTS } from '@/constants/messages';

export const up: QueryInterfaceSeedFn = async ({ context: queryInterface }) => {  const hashedUsers = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await bcrypt.hash(user.password, DB_CONSTANTS.BCRYPT_SALT_ROUNDS),
    }))
  );

  await queryInterface.bulkInsert(DB_CONSTANTS.TABLE_NAMES.USERS, hashedUsers, {});
};

export const down: QueryInterfaceSeedFn = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete(DB_CONSTANTS.TABLE_NAMES.USERS, {}, {});
};
