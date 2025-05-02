import { DataType, Sequelize } from 'sequelize-typescript';

export const up = async ({ context }: { context: Sequelize }) => {
  const queryInterface = context.getQueryInterface();
  await queryInterface.createTable('Users', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    full_name: {
      type: DataType.STRING,
      allowNull: false,
      unique: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      unique: false,
    },
    last_activity: {
      type: DataType.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataType.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataType.DATE,
      allowNull: false,
    },
  });
};

export const down = async ({ context }: { context: Sequelize }) => {
  const queryInterface = context.getQueryInterface();
  await queryInterface.dropTable('Users');
};
