export class Company {
  id: string;
  name: string;
  description: string;
  companyCode: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.companyCode = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }

  public static fromJson(json: Company): Company {
    const company = new Company();
    company.id = json.id;
    company.name = json.name;
    company.description = json.description;
    company.companyCode = json.companyCode;
    company.createdAt = json.createdAt;
    company.updatedAt = json.updatedAt;
    company.deletedAt = json.deletedAt;
    return company;
  }
}
