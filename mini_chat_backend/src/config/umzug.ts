import { SequelizeStorage, Umzug } from 'umzug';
import DataBase from '@/config/database';

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
