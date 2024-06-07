import { CompanyService } from '../services/company.service';
import express, { Router } from 'express';

export class CompanyController {
  private router: Router;

  constructor(private companyService: CompanyService) {
    this.router = express.Router();
    this.router.get('/', this.getCompanies.bind(this));
    this.router.post('/create', this.createCompany.bind(this));
  }

  public getRouter(): Router {
    return this.router;
  }

  private async getCompanies(req: express.Request, res: express.Response): Promise<void> {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed');
      return;
    }
    const companies = await this.companyService.getCompanies();
    res.json(companies);
  }

  private async createCompany(req: express.Request, res: express.Response): Promise<void> {
    if (!req.body) {
      res.status(400).send('Request body is missing');
      return;
    }

    const { name, companyCode } = req.body;

    if (!name || !companyCode) {
      res.status(400).send('Required fields are missing');
      return;
    }

    const company = await this.companyService.createCompany(name, companyCode);
    res.status(201).send(company);
  }
}
