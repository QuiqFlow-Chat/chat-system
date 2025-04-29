import { Column, DataType, ForeignKey, PrimaryKey, Table , Model} from "sequelize-typescript";
import User from "./User";
import Conversation from "./Conversation";

interface UserConversationCreateAttributes{
    id:string;
    userId:string;
    conversationId:string
}

@Table({
    tableName:'UserConversations'
})
class UserConversation extends Model<UserConversation> implements UserConversationCreateAttributes{

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4
    })
    @PrimaryKey
    id!: string;

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        allowNull:false
    })
    @ForeignKey(()=>User)
    userId!: string;

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        allowNull:false
    })
    
    @ForeignKey(()=>Conversation)
    conversationId!: string;

}
export default UserConversation;