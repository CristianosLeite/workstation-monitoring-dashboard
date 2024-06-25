export class Workstation {
  id: string;
  company_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = '';
    this.company_id = '';
    this.name = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static fromJson(json: Workstation): Workstation {
    const workstation = new Workstation();
    workstation.id = json.id;
    workstation.company_id = json.company_id;
    workstation.name = json.name;
    workstation.created_at = json.created_at;
    workstation.updated_at = json.updated_at;
    return workstation;
  }
}
