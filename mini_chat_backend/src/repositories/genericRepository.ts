import { Model, ModelStatic } from 'sequelize-typescript';
import { IGenericRepository } from './genericRepositoryInterface';

export abstract class GenericRepository<T extends Model> implements IGenericRepository<T> {
    model: any;

  onstructor(protected model: ModelStatic<T>) {}

  
    async find(): Promise<T[]> {
      return await this.model.findAll(options);
    }
  
    async findOne(options?: FindOptions<Attributes<T>>): Promise<T | null> {
      return await this.model.findOne(options);
    }
  
    async delete(options?: DestroyOptions<Attributes<T>>): Promise<number> {
      return await this.model.destroy(options);
    }
  }  

