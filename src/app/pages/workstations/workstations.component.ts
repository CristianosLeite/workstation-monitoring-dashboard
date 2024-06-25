import { Component } from '@angular/core';
import { CreateWorkstationsComponent } from '../../components/create-workstations/create-workstations.component';


@Component({
  selector: 'app-workstations',
  standalone: true,
  imports: [CreateWorkstationsComponent],
  templateUrl: './workstations.component.html',
  styleUrl: './workstations.component.scss'
})
export class WorkstationsComponent {
}
