
import {  Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";

interface UserAttributes{
    id:string;
    fullName:string;
    email:string;
    passowrd:string ;
    lastActivity:number;
}

@Table({tableName:'Users'})
 class User extends Model<User> implements UserAttributes
{
    @PrimaryKey
    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
    })
    id!:string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    @Unique
    fullName!: string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    @Unique
    email!: string;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    @Unique
    passowrd!: string;

    @Column({
        type:DataType.NUMBER,
    })
    lastActivity!: number;

}
export default User;