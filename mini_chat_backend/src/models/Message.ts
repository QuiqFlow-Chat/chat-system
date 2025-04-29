import {
  AllowNull,
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
  conversationId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Table({
  tableName: 'Messages',
  timestamps: true,
})
class Message extends Model<Message> implements MessageCreateAttributes {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @PrimaryKey
  id!: string;

  @Column({
    type: DataType.STRING,
  })
  @AllowNull(false)
  content!: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @AllowNull(false)
  @ForeignKey(() => User)
  senderId!: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  @ForeignKey(() => Conversation)
  conversationId!: string;

  @BelongsTo(() => User)
  sender!: User;

  @BelongsTo(() => Conversation)
  conversation!: Conversation;

  @CreatedAt
  @Column({ type: DataType.DATE })
  @AllowNull(false)
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  @AllowNull(false)
  updatedAt!: Date;
}
export default Message;
