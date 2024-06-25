import { Component } from '@angular/core';
import { CreateNotificationsComponent } from '../../components/create-notifications/create-notifications.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CreateNotificationsComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
}
