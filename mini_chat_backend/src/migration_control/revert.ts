import umzug from '@/config/umzug';

const undoAllMigrations = async () => {
  try {
    await umzug.down({ to: 0 });
    console.log(' Rolled back last migration!');
  } catch (error) {
    console.log('Rollback failed:', error);
  }
};
undoAllMigrations();
