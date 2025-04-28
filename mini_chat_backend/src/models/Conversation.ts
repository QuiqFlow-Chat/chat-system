import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

interface ConversationCreateAttributes{
    id:string;
}

@Table({
    tableName:'Conversations'
})
class Conversation extends Model<Conversation> implements ConversationCreateAttributes{

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    @PrimaryKey
    id!: string;
}
export default Conversation;