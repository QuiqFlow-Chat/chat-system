export interface IUserRepository<User> {
    add(data: any): Promise<void>;
    getAll(): Promise<User[]>;
    getUserConversations(id:string):Promise<User | null>;
    getByEmail(email: string) : Promise<User | null>
    getById(id: string): Promise<User | null>;
    delete(entity: User): Promise<void>;
    update(entity: User): Promise<void>;
  }
  