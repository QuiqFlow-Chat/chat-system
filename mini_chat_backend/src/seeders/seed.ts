import DataBase from '@/config/database';
import { MESSAGES } from '@/constants/messages';
import { up as seedUsers } from '@/seeders/20250428145025-user-seed';
import { up as seedConversations } from '@/seeders/20250428145100-conversation-seed';
import { up as seedUserConversations } from '@/seeders/20250428145052-userconversation-seed';
import { up as seedMessages } from '@/seeders/20250428145037-message-seed';

const runSeeds = async (): Promise<void> => {
  const sequelize = DataBase.getDbInstance();
  const queryInterface = sequelize.getQueryInterface();

  try {
    console.log(MESSAGES.SEED.START);
    
    await seedUsers({ context: queryInterface });
    await seedConversations({ context: queryInterface });
    await seedUserConversations({ context: queryInterface });
    await seedMessages({ context: queryInterface });

    console.log(MESSAGES.SEED.SUCCESS);
  } catch (error) {
    console.error(MESSAGES.SEED.FAILURE, error);
  } finally {
    process.exit();
  }
};

runSeeds();
