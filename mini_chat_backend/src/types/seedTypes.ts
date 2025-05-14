import { QueryInterface } from 'sequelize';

export type SeedFn<T> = (options: { context: T }) => Promise<void>;

export type QueryInterfaceSeedFn = SeedFn<QueryInterface>;
