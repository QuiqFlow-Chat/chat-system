import { up as seedUsers } from './20250428145025-user-seed';
import { up as seedConversations } from './20250428145100-conversation-seed';
import { up as seedUserConversations } from './20250428145052-userconversation-seed';
import { up as seedMessages } from './20250428145037-message-seed';
import DataBase from '../config/database';

const runSeeds = async () => {
  const sequelize = DataBase.getDbInstance();
  const queryInterface = sequelize.getQueryInterface();
  
  try {
    // Run seeds in the correct order (following the dependencies between tables)
    console.log('Starting seed process...');
    await seedUsers({ context: queryInterface });
    await seedConversations({ context: queryInterface });
    await seedUserConversations({ context: queryInterface });
    await seedMessages({ context: queryInterface });
    
    console.log('All seeds executed successfully');
  } catch (error) {
    console.error('Seeds execution failed:', error);
  } finally {
    process.exit();
  }
};

runSeeds();