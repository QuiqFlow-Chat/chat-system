'use strict';

import userConversations from '@/data/userConversations.json';
import { QueryInterfaceSeedFn } from '@/types/seedTypes';
import { DB_CONSTANTS } from '@/constants/messages';

export const up: QueryInterfaceSeedFn = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert(DB_CONSTANTS.TABLE_NAMES.USER_CONVERSATIONS, userConversations, {});
};

export const down: QueryInterfaceSeedFn = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete(DB_CONSTANTS.TABLE_NAMES.USER_CONVERSATIONS, {}, {});
};
