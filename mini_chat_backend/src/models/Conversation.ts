
import { AllowNull, BelongsToMany, Column, CreatedAt, DataType, HasMany, Model, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import Message from "./Message";
import User from "./User";
import UserConversation from "./UserConversation";

interface ConversationCreateAttributes{
    id:string;
    createdAt:Date;
    updatedAt:Date;
}

@Table({
    tableName:'Conversations',
    timestamps:true
})
class Conversation extends Model<Conversation> implements ConversationCreateAttributes{

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    @PrimaryKey
    id!: string;
    
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

    @BelongsToMany(() => User, () => UserConversation)
    users!: User[];;
}
export default Conversation;