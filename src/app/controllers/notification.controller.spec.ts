import { NotificationController } from './notification.controller';
import { NotificationService } from '../services/notification.service';
import { Database } from '../models/data/database';

describe('NotificationController', () => {
  it('should create an instance', () => {
    const db = new Database();
    db.initialize();
    const notificationService = new NotificationService(db);
    expect(new NotificationController(notificationService)).toBeTruthy();
  });
});
