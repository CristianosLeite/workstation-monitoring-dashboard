import { NotificationService } from "../services/notification.service";
import express, { Router } from 'express';

export class NotificationController {
  private router: Router;

  constructor(private notificationService: NotificationService) {
    this.router = express.Router();
    this.router.get('/', this.getNotifications.bind(this));
    this.router.post('/create', this.createNotification.bind(this));
    this.router.patch('/update', this.updateNotification.bind(this));
  }

  public getRouter(): Router {
    return this.router;
  }

  private async updateNotification(req: express.Request, res: express.Response): Promise<void> {
    if (!req.body) {
      res.status(400).send('Request body is missing');
      return;
    }

    const { id, isAcknowledged, responsible, action } = req.body;

    if (!id || isAcknowledged === undefined) {
      res.status(400).send('Required fields are missing');
      return;
    }

    const notification = await this.notificationService.updateNotification(id, isAcknowledged, responsible, action);
    res.send(notification);
  }

  private async getNotifications(req: express.Request, res: express.Response): Promise<void> {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed');
      return;
    }
    const notifications = await this.notificationService.getNotifications();
    res.json(notifications);
  }

  private async createNotification(req: express.Request, res: express.Response): Promise<void> {
    if (!req.body) {
      res.status(400).send('Request body is missing');
      return;
    }

    const { workstationId, content } = req.body;

    if (!workstationId || !content) {
      res.status(400).send('Required fields are missing');
      return;
    }

    const notification = await this.notificationService.createNotification(workstationId, content);
    if (!notification.id) {
      res.status(500).send('Error creating notification');
      return;
    }
    this.notificationService.sendNotification(notification);
    res.status(201).send(notification);
  }
}
