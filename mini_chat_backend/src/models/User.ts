
import {  AllowNull, BelongsToMany, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";
import Message from "./Message";
import Conversation from "./Conversation";
import UserConversation from "./UserConversation";

interface UserAttributes{
    id:string;
    fullName:string;
    email:string;
    password:string ;
    lastActivity:number;
    createdAt:Date,
    updatedAt:Date
}

@Table({tableName:'Users',timestamps:true})
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
    })
    @Unique
    @AllowNull(false)
    fullName!: string;

    @Column({
        type:DataType.STRING,
    })
    @Unique
    @AllowNull(false)
    email!: string;

    @Column({
        type:DataType.STRING,
    })
    @Unique
    @AllowNull(false)
    password!: string;

    @Column({
        type:DataType.BIGINT,
    })
    lastActivity!: number;

    @CreatedAt
    @Column({type:DataType.DATE})
    @AllowNull(false)
    createdAt!: Date;

    @UpdatedAt
    @Column({type:DataType.DATE})
    @AllowNull(false)
    updatedAt!: Date;

    @HasMany(()=> Message)
    messages!:Message[]

    @BelongsToMany(() => Conversation,() => UserConversation)
    conversations!:Conversation[]
    
}
export default User;