import { WorkstationService } from "../services/workstation.service";
import express, { Router } from "express";

export class WorkstationController {
  private router: Router;

  constructor(private workstationService: WorkstationService) {
    this.router = express.Router();
    this.router.get('/', this.getWorkstations.bind(this));
    this.router.post('/create', this.createWorkstation.bind(this));
  }

  public getRouter(): Router {
    return this.router;
  }

  private async getWorkstations(req: express.Request, res: express.Response): Promise<void> {
    if (req.method !== 'GET') {
      res.status(405).send('Method Not Allowed');
      return;
    }
    const workstations = await this.workstationService.getWorkstations();
    res.json(workstations);
  }

  private async createWorkstation(req: express.Request, res: express.Response): Promise<void> {
    if (!req.body) {
      res.status(400).send('Request body is missing');
      return;
    }

    const { companyId, name } = req.body;

    if (!companyId || !name) {
      res.status(400).send('Required fields are missing');
      return;
    }

    const workstation = await this.workstationService.createWorkstation(companyId, name);
    res.status(201).send(workstation);
  }
}
