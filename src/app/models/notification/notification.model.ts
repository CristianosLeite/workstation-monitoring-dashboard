export class Notification {
  id: string;
  workstation_id: string;
  content: string;
  is_acknowledged: boolean;
  responsible: string;
  action: string;
  created_at: Date;
  updated_at: Date;

  constructor() {
    this.id = '';
    this.workstation_id = '';
    this.content = '';
    this.is_acknowledged = false;
    this.responsible = '';
    this.action = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  public static fromJson(json: Notification): Notification {
    const notification = new Notification();
    notification.id = json.id;
    notification.workstation_id = json.workstation_id;
    notification.content = json.content;
    notification.is_acknowledged = json.is_acknowledged;
    notification.responsible = json.responsible;
    notification.action = json.action;
    notification.created_at = json.created_at;
    notification.updated_at = json.updated_at;
    return notification;
  }
}
