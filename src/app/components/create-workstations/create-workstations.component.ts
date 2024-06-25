import { Component } from '@angular/core';
import { Workstation } from '../../models/workstation/workstation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-workstations',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-workstations.component.html',
  styleUrl: './create-workstations.component.scss'
})
export class CreateWorkstationsComponent {
  workstation = {} as Workstation;

  constructor() {}

  submitForm() {
    console.log(this.workstation.company_id);
    console.log(this.workstation.name);
  }
}
