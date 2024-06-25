import { Component } from '@angular/core';
import { CreateCompanyComponent } from '../../components/create-company/create-company.component';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [CreateCompanyComponent],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {

}
