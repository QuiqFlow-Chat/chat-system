import { DataType, Sequelize } from 'sequelize-typescript';

export const up = async ({ context }: { context: Sequelize }) => {
  const queryInterface = context.getQueryInterface();
  await queryInterface.createTable('Messages', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
    },
    content: {
      allowNull: false,
      type: DataType.STRING,
    },
    sender_id: {
      allowNull: false,
      type: DataType.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    receiver_id: {
      allowNull: false,
      type: DataType.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    conversation_id: {
      allowNull: true,
      type: DataType.UUID,
      references: {
        model: 'Conversations',
        key: 'id',
      },
    },
    is_read: {
      allowNull: true,
      type: DataType.BOOLEAN,
    },
    created_at: {
      allowNull: false,
      type: DataType.DATE,
    },
    updated_at: {
      type: DataType.DATE,
    },
  });
};

export const down = async ({ context }: { context: Sequelize }) => {
  const queryInterface = context.getQueryInterface();
  await queryInterface.dropTable('Messages');
};
