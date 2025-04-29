import umzug from '../config/umzug';
const runMigrations = async () => {
  try {
    await umzug.up();
    console.log('All migrations applied!');
  } catch (error) {
    console.log('Migration failed:' + error);
  }
};

runMigrations();
