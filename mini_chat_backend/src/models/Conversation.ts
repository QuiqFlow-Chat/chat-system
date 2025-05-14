import {
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import Message from '@/models/Message';
import User from '@/models/User';
import UserConversation from '@/models/UserConversation';
import { IConversationAttributes } from '@/types/dtosInterfaces/conversationDtos';

@Table({
  tableName: 'Conversations',
  timestamps: true,
})
class Conversation
  extends Model<IConversationAttributes>
  implements IConversationAttributes
{
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false, field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false, field: 'updated_at' })
  updatedAt!: Date;

  @HasMany(() => Message)
  messages!: Message[];

  @BelongsToMany(() => User, () => UserConversation)
  users!: User[];
}
export default Conversation;
