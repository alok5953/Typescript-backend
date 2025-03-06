import { IDatabase, ITask } from 'pg-promise';


export interface IExtensions { }

export type Transaction = ITask<IExtensions> & IExtensions;

export type ExtendedDatabase = IDatabase<IExtensions> & IExtensions;

export const initOptions: any = {
    extend: (db: ExtendedDatabase, dc: any) => {
        return dc;
    }
};