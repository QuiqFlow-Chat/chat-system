import { DataType, Sequelize } from "sequelize-typescript";

export const up = async ({context}:{context:Sequelize}) => {
    const queryInterface = context.getQueryInterface();
    await queryInterface.createTable('Conversations',{
        id:{
            primaryKey:true,
            allowNull:false,
            type:DataType.UUID,
            defaultValue:DataType.UUIDV4
        },

        CreatedAt:{
            allowNull:false,
            type:DataType.DATE
        },

        UpdatedAt:{
            allowNull:false,
            type:DataType.DATE
        }
    });
}

export const down = async ({context}:{context:Sequelize}) => {
    const queryInterface = context.getQueryInterface();
    await queryInterface.dropTable('Conversations');
}