import umzug from './config/umzug';

const runMigrations = async () => {
  try {
    await umzug.up();
    console.log('All migrations completed ... ');
  } catch (error) {
    console.log('migrations faild : ' + error);
  }
};

runMigrations();
