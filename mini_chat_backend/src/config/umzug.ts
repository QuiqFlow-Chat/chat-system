import { SequelizeStorage, Umzug } from "umzug";
import DataBase  from "./database";
import path from "path";

const sequelize = DataBase.getDbInsatnce();
const umzug = new Umzug({
    migrations :{
        glob :  path.join(__dirname, 'migrations', '*.ts')
    },
    context : sequelize,
    storage : new SequelizeStorage({sequelize}),
    logger:console
});

const undoAllMigrations = async () =>{
    try {
        await umzug.down();
        console.log("Undo all migrations completed .. ");
    } catch (error) {
        console.log("Undo all migrations faild");
    }
}
undoAllMigrations();
export default umzug;