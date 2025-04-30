export interface IGenericRepository<T> {
  addAsync(data: any): Promise<void | T>;
  getAllAsync(): Promise<T[]>;
  getByIdAsync(id: string): Promise<T | null>;
  deleteAsync(entity: T): Promise<void>;
  updateAsync(entity: T): Promise<void>;
}
