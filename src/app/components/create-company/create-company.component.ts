import { Component } from '@angular/core';
import { Company } from '../../models/company/company.model';
import { FormsModule } from '@angular/forms';
import { Database } from '../../models/data/database';
//import dotenv from 'dotenv';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.scss'
})
export class CreateCompanyComponent {
  company = {} as Company;

  constructor(
  ) {
    //dotenv.config();
    //const conectionString = String(process.env['DATABASE_URL']);
  }

  submitForm() {
    const conectionString = 'postgresql://postgres:123@localhost:5432/workstation-monitoring';
    const database = new Database(conectionString);
    database.setCompany(this.company.name, this.company.company_code);
  }
}
