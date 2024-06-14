import { Injectable } from '@angular/core';
import { Workstation } from '../models/workstation/workstation.model';
import { Database } from '../models/data/database';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {

  constructor(private db: Database) { }

  public async getWorkstations(): Promise<Workstation[]> {
    return await this.db.getWorkstations();
  }

  public async createWorkstation(companyId: number, name: string): Promise<Workstation> {
    return await this.db.createWorkstation(companyId, name);
  }
}
