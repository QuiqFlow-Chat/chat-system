import { DataType, Sequelize } from 'sequelize-typescript';

export const up = async ({ context }: { context: Sequelize }) => {
  const queryInterface = context.getQueryInterface();
  await queryInterface.createTable('Users', {
    id: {
      type: DataType.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    },
    lastActivity: {
      type: DataType.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
  });
};

export const down = async ({ context }: { context: Sequelize }) => {
  const queryInterface = context.getQueryInterface();
  await queryInterface.dropTable('Users');
};
