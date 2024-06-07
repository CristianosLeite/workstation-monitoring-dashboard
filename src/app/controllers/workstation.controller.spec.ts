import { WorkstationController } from './workstation.controller';
import { WorkstationService } from '../services/workstation.service';
import { Database } from '../models/data/database';

describe('WorkstationController', () => {
  it('should create an instance', () => {
    const db = new Database();
    db.initialize();
    const workstationService = new WorkstationService(db);
    expect(new WorkstationController(workstationService)).toBeTruthy();
  });
});
