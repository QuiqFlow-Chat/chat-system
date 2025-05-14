import { Column, DataType, ForeignKey, PrimaryKey, Table, Model } from 'sequelize-typescript';
import User from '@/models/User';
import Conversation from '@/models/Conversation';
import { IUserConversationAttributes } from '@/types/dtosInterfaces/userConversationDtos';

@Table({
  tableName: 'UserConversations',
  timestamps: true,
  indexes: [
    {
      name: 'idx_userConversation_userId',
      fields: ['userId'],
    },
    {
      name: 'idx_userConversation_conversationId',
      fields: ['userId'],
    },
    {
      name: 'idx_userConversation_userId_conversationId',
      fields: ['userId', 'conversationId'],
    },
  ],
})
class UserConversation
  extends Model<IUserConversationAttributes>
  implements IUserConversationAttributes
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
