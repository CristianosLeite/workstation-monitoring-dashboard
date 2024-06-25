import { Client } from 'pg';
import { Company } from '../company/company.model';
import { Workstation } from '../workstation/workstation.model';
import { Notification } from '../notification/notification.model';

export class Database {
  private client: Client;

  constructor(conectionString: string) {
    this.client = new Client({
      connectionString: conectionString,
    });

    this.createCompanyTable();
    this.createWorkstationTable();
    this.createNotificationTable();
  }

  public initialize(): void {
    this.client.connect()
      .then(() => console.log('Connected to database'))
      .catch((err) => console.error('Error connecting to database', err));
  }

  // Company
  private createCompanyTable(): void {
    this.client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company_code INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
      .catch((err) => console.error('Error creating table', err));
  }

  async setCompany(name: string, companyCode: number): Promise<Company> {
    let company = new Company();
    await this.client.query(`
      INSERT INTO companies (name, company_code)
      VALUES ('${name}', ${companyCode}) RETURNING *;
    `)
      .then((res) => {
        company = res.rows[0];
      })
      .catch((err) => console.error('Error creating company', err));
    return company;
  }

  async getCompanies(): Promise<Company[]> {
    try {
      const res = await this.client.query('SELECT * FROM companies');
      return res.rows;
    } catch (err) {
      console.error('Error getting companies', err);
      return [];
    }
  }

  // Workstation
  createWorkstationTable(): void {
    this.client.query(`
      CREATE TABLE IF NOT EXISTS workstations (
        id SERIAL PRIMARY KEY,
        company_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
      .catch((err) => console.error('Error creating table', err));
  }

  async createWorkstation(companyId: number, name: string): Promise<Workstation> {
    let newWorkstation = new Workstation();
    const text = 'INSERT INTO workstations(company_id, name, description, created_at, updated_at) VALUES($1, $2, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
    const values = [companyId, name];
    try {
      const res = await this.client.query(text, values);
      newWorkstation = res.rows[0];
    } catch (err) {
      console.error('Error creating workstation', err);
    }
    return newWorkstation;
  }

  async getWorkstations(): Promise<any> {
    try {
      const res = await this.client.query('SELECT * FROM workstations');
      return res.rows;
    } catch (err) {
      return console.error('Error getting workstations', err);
    }
  }

  // Notification
  createNotificationTable(): void {
    this.client.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        workstation_id TEXT NOT NULL,
        content TEXT NOT NULL,
        isAcknowledged BOOLEAN DEFAULT FALSE,
        responsible TEXT,
        action TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
      .catch((err) => console.error('Error creating table', err));
  }

  async createNotification(workstationId: string, content: string): Promise<Notification> {
    let newNotification = new Notification();
    const text = 'INSERT INTO notifications(workstation_id, content, isAcknowledged, created_at, updated_at, responsible, action) VALUES($1, $2, FALSE, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL, NULL) RETURNING *';
    const values = [workstationId, content];
    try {
      const res = await this.client.query(text, values);
      newNotification = res.rows[0];
    } catch (err) {
      console.error('Error creating notification', err);
    }
    return newNotification;
  }

  async getNotifications(): Promise<Notification[]> {
    try {
      const res = await this.client.query('SELECT * FROM notifications');
      return res.rows;
    } catch (err) {
      console.error('Error getting notifications', err);
      return [];
    }
  }

  async updateNotification(id: number, isAcknowledged: boolean, responsible: string, action: string): Promise<Notification> {
    let notification = new Notification();
    await this.client.query(`
      UPDATE notifications
      SET isAcknowledged = $1, updated_at = CURRENT_TIMESTAMP, responsible = $2, action = $3
      WHERE id = $4 RETURNING *;
    `, [isAcknowledged, responsible, action, id])
      .then((res) => {
        notification = res.rows[0];
      })
      .catch((err) => console.error('Error updating notification', err));
    return notification;
  }

  public close(): void {
    this.client.end()
      .then(() => console.log('Disconnected from database'))
      .catch((err) => console.error('Error disconnecting from database', err));
  }
}
