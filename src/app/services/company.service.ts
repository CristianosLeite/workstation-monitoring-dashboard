import { Injectable } from '@angular/core';
import { Company } from '../models/company/company.model';
import { Database } from '../models/data/database';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private db: Database) { }

  public async getCompanies(): Promise<Company[]> {
    return await this.db.getCompanies();
  }

  public async createCompany(name: string, companyCode: number): Promise<Company> {
    return await this.db.setCompany(name, companyCode);
  }
}
