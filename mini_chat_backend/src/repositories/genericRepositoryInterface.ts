import { v4 as uuidv4 } from 'uuid';
export interface IGenericRepository<T> {
  addAsync(data: any): Promise<void>;
  getAllAsync(): Promise<T[]>;
  getByIdAsync(id: string): Promise<T | null>;
  deleteAsync(entity: T): Promise<void>;
  updateAsync(entity: T): Promise<void>;
}
