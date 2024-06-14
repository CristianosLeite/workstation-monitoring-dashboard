import { Injectable } from '@angular/core';
import { Notification } from '../models/notification/notification.model';
import { Database } from '../models/data/database';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private db: Database) { }

  public async updateNotification(id: number, isAcknowledged: boolean, responsible: string, action: string): Promise<Notification> {
    return await this.db.updateNotification(id, isAcknowledged, responsible, action);
  }

  public async getNotifications(): Promise<Notification[]> {
    return await this.db.getNotifications();
  }

  public async createNotification(workstationId: number, message: string): Promise<Notification> {
    return await this.db.setNotification(workstationId, message);
  }
}
