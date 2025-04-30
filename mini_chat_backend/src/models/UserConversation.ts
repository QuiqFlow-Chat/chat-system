import { Column, DataType, ForeignKey, PrimaryKey, Table, Model } from 'sequelize-typescript';
import User from './User';
import Conversation from './Conversation';

interface UserConversationCreateAttributes {
  id: string;
  userId: string;
  conversationId: string;
}

@Table({
  tableName: 'UserConversations',
})
class UserConversation
  extends Model<UserConversationCreateAttributes>
  implements UserConversationCreateAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id',
  })
  @ForeignKey(() => User)
  userId!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'conversation_id',
  })
  @ForeignKey(() => Conversation)
  conversationId!: string;
}

export default UserConversation;
