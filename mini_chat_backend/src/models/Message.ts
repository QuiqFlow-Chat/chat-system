import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import User from './User';
import Conversation from './Conversation';

interface MessageCreateAttributes {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  isRead: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: 'Messages',
  timestamps: true,
})
class Message extends Model<MessageCreateAttributes> implements MessageCreateAttributes {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'sender_id',
  })
  @ForeignKey(() => User)
  senderId!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'receiver_id',
  })
  @ForeignKey(() => User)
  receiverId!: string;

  @Column({
    type: DataType.UUID,
    field: 'conversation_id',
  })
  @ForeignKey(() => Conversation)
  conversationId!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'is_read', defaultValue: false })
  isRead!: boolean;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false, field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false, field: 'updated_at' })
  updatedAt!: Date;

  @BelongsTo(() => User, 'senderId')
sender!: User;

@BelongsTo(() => User, 'receiverId')
receiver!: User;

@BelongsTo(() => Conversation)
conversation!: Conversation;
}
export default Message;
