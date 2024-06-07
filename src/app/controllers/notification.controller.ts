import { NotificationService } from "../services/notification.service";
import express, { Router } from 'express';

export class NotificationController {
  private router: Router;

  constructor(private notificationService: NotificationService) {
    this.router = express.Router();
    this.router.get('/', this.getNotifications.bind(this));
    this.router.post('/create', this.createNotification.bind(this));
  }

  public getRouter(): Router {
    return this.router;
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

    const { workstationId, message } = req.body;

    if (!workstationId || !message) {
      res.status(400).send('Required fields are missing');
      return;
    }

    const notification = await this.notificationService.createNotification(workstationId, message);
    res.status(201).send(notification);
  }
}
