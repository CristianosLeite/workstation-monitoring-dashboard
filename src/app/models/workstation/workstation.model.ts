export class Workstation {
  id: string;
  companyId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor() {
    this.id = '';
    this.companyId = '';
    this.name = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }

  public static fromJson(json: Workstation): Workstation {
    const workstation = new Workstation();
    workstation.id = json.id;
    workstation.companyId = json.companyId;
    workstation.name = json.name;
    workstation.createdAt = json.createdAt;
    workstation.updatedAt = json.updatedAt;
    workstation.deletedAt = json.deletedAt;
    return workstation;
  }
}
