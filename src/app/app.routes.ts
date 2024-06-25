import { Routes } from '@angular/router';
import { CompanyComponent } from './pages/company/company.component';
import { WorkstationsComponent } from './pages/workstations/workstations.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';

export const routes: Routes = [
  {path: 'company', component: CompanyComponent},
  {path: 'workstations', component: WorkstationsComponent},
  {path: 'notifications', component: NotificationsComponent},
];
