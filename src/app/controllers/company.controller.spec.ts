import { CompanyController } from './company.controller';
import { CompanyService } from '../services/company.service';
import { Database } from '../models/data/database';

describe('CompanyController', () => {
  it('should create an instance', () => {
    const db = new Database();
    db.initialize();
    const companyService = new CompanyService(db);
    expect(new CompanyController(companyService)).toBeTruthy();
  });
});
