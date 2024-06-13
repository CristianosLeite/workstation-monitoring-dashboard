import { Client } from 'pg';
import { Company } from '../company/company.model';
import { Workstation } from '../workstation/workstation.model';
import { Notification } from '../notification/notification.model';
import dotenv from 'dotenv';

export class Database {
  private client: Client;

  constructor() {
    dotenv.config();
    this.client = new Client({
      connectionString: process.env['DATABASE_URL'],
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

  async setWorkstation(companyId: number, name: string): Promise<Workstation> {
    let workstation = new Workstation();
    await this.client.query(`
      INSERT INTO workstations (company_id, name)
      VALUES (${companyId}, '${name}') RETURNING *;
    `)
      .then((res) => {
        workstation = res.rows[0];
      })
      .catch((err) => console.error('Error creating workstation', err));
    return workstation;
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
        message TEXT NOT NULL,
        isAcknowledged BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
      .catch((err) => console.error('Error creating table', err));
  }

  async setNotification(workstationId: number, message: string): Promise<Notification> {
    let notification = new Notification();
    await this.client.query(`
      INSERT INTO notifications (workstation_id, message)
      VALUES (${workstationId}, '${message}') RETURNING *;
    `)
      .then((res) => {
        notification = res.rows[0];
      })
      .catch((err) => console.error('Error creating notification', err));
    return notification;
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

  public close(): void {
    this.client.end()
      .then(() => console.log('Disconnected from database'))
      .catch((err) => console.error('Error disconnecting from database', err));
  }
}
