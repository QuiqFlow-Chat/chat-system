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
import Conversation from '@/models/Conversation';
import UserConversation from '@/models/UserConversation';
import { IUserAttributes } from '@/types/dtosInterfaces/userDtos';

@Table({
  tableName: 'Users',
  timestamps: true,
  indexes: [
    {
      name: 'idx_user_email',
      fields: ['email'],
    },
  ],
})
class User extends Model<IUserAttributes> implements IUserAttributes {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'full_name',
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    field: 'last_activity',
    allowNull: true,
  })
  lastActivity!: Date;

  @CreatedAt
  @Column({ type: DataType.DATE, allowNull: false, field: 'created_at' })
  createdAt!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, allowNull: false, field: 'updated_at' })
  updatedAt!: Date;

  @HasMany(() => Message, 'senderId')
  sentMessages!: Message[];

  @HasMany(() => Message, 'receiverId')
  receivedMessages!: Message[];

  @BelongsToMany(() => Conversation, () => UserConversation)
  conversations!: Conversation[];
}

export default User;
