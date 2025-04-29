import { SequelizeStorage, Umzug } from 'umzug';
import DataBase from './database';
import path from 'path';

const sequelize = DataBase.getDbInstance();
const umzug = new Umzug({
  migrations: {
    glob: 'src/migrations/*.ts',
  },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
export default umzug;
