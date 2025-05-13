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
import User from '@/models/User';
import Conversation from '@/models/Conversation';
import { IMessageAttributes } from '@/types/dtosInterfaces/messageDtos';


@Table({
  tableName: 'Messages',
  timestamps: true,
  indexes: [
    {
      name: 'idx_message_senderId',
      fields: ['senderId'],
    },
    {
      name: 'idx_message_receiverId',
      fields: ['receiverId'],
    },
    {
      name: 'idx_message_sender_IdAndReceiver_Id',
      fields: ['senderId', 'receiverId'],
    },
  ],
})
class Message extends Model<IMessageAttributes> implements IMessageAttributes {
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
    allowNull: true,
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
