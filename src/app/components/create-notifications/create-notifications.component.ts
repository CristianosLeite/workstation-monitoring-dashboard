import { Component } from '@angular/core';
import { Notification } from '../../models/notification/notification.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-notifications',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-notifications.component.html',
  styleUrl: './create-notifications.component.scss'
})
export class CreateNotificationsComponent {
  notification = {} as Notification;

  constructor() {}

  submitForm() {
    console.log(this.notification.workstation_id);
    console.log(this.notification.content);
  }
}
