export class Notification {
  id: string;
  workstationId: string;
  message: string;
  isAcknowledged: boolean;
  responsible: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = '';
    this.workstationId = '';
    this.message = '';
    this.isAcknowledged = false;
    this.responsible = '';
    this.action = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public static fromJson(json: Notification): Notification {
    const notification = new Notification();
    notification.id = json.id;
    notification.workstationId = json.workstationId;
    notification.message = json.message;
    notification.isAcknowledged = json.isAcknowledged;
    notification.responsible = json.responsible;
    notification.action = json.action;
    notification.createdAt = json.createdAt;
    notification.updatedAt = json.updatedAt;
    return notification;
  }
}
