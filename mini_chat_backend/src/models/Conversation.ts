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
import Message from './Message';
import User from './User';
import UserConversation from './UserConversation';

interface ConversationCreateAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: 'Conversations',
  timestamps: true,
})
class Conversation
  extends Model<ConversationCreateAttributes>
  implements ConversationCreateAttributes
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
