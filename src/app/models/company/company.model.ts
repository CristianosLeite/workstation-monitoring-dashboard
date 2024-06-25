export class Company {
  id: string;
  name: string;
  description: string;
  company_code: number;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = '';
    this.name = '';
    this.description = '';
    this.company_code = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static fromJson(json: Company): Company {
    const company = new Company();
    company.id = json.id;
    company.name = json.name;
    company.description = json.description;
    company.company_code = json.company_code;
    company.created_at = json.created_at;
    company.updated_at = json.updated_at;
    return company;
  }
}
