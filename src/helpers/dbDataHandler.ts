import { ActivityType } from './interfaces';
import { v4 as uuid } from "uuid";
import dbHandler from 'src/helpers/dbHandler';
import { IFilter } from './dbHandler';

export interface ITrackingRecord {
  id?: string;
  startTimestamp: number;
  endTimestamp: number;
  activity: ActivityType;
  distance: number;
}

export default {
  async insertTracking(record: ITrackingRecord): Promise<void> {
    await dbHandler.insert('tracking', {id: uuid().replace(/-/g, ''), ...record});
  },

  async getTracking(filter?: IFilter[]): Promise<ITrackingRecord[]> {
    return await dbHandler.loadData('tracking', filter);
  }
}