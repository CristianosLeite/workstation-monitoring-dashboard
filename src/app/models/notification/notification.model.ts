export class Notification {
  id: string;
  workstationId: string;
  content: string;
  isAcknowledged: boolean;
  responsible: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;

  constructor() {
    this.id = '';
    this.workstationId = '';
    this.content = '';
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
    notification.content = json.content;
    notification.isAcknowledged = json.isAcknowledged;
    notification.responsible = json.responsible;
    notification.action = json.action;
    notification.createdAt = json.createdAt;
    notification.updatedAt = json.updatedAt;
    return notification;
  }
}
