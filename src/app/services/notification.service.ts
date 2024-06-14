import { Injectable } from '@angular/core';
import { Notification } from '../models/notification/notification.model';
import { Database } from '../models/data/database';
import WebSocket from 'ws';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private db: Database, private wss: WebSocket.Server) { }

  public async updateNotification(id: number, isAcknowledged: boolean, responsible: string, action: string): Promise<Notification> {
    return await this.db.updateNotification(id, isAcknowledged, responsible, action);
  }

  public async getNotifications(): Promise<Notification[]> {
    return await this.db.getNotifications();
  }

  public async createNotification(workstationId: string, content: string): Promise<Notification> {
    return await this.db.createNotification(workstationId, content);
  }

  public sendNotification(notification: Notification): void {
    const data = JSON.stringify({ event: 'notification', message: notification });
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }
}
