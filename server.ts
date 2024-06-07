import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { json, urlencoded } from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { Database } from './src/app/models/data/database';
import { CompanyController } from './src/app/controllers/company.controller';
import { CompanyService } from './src/app/services/company.service';
import { WorkstationController } from './src/app/controllers/workstation.controller';
import { WorkstationService } from './src/app/services/workstation.service';
import { NotificationController } from './src/app/controllers/notification.controller';
import { NotificationService } from './src/app/services/notification.service';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Initialize database connection
  const db = new Database();
  db.initialize();

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // Enable parsing of application/json and application/x-www-form-urlencoded
  server.use(json());
  server.use(urlencoded({ extended: true }));

  // API routes

  // Companies
  const companyService = new CompanyService(db);
  const companyController = new CompanyController(companyService);
  server.use('/api/companies', companyController.getRouter());

  // Workstations
  const workstationService = new WorkstationService(db);
  const workstationController = new WorkstationController(workstationService);
  server.use('/api/workstations', workstationController.getRouter());

  // Notifications
  const notificationService = new NotificationService(db);
  const notificationController = new NotificationController(notificationService);
  server.use('/api/notifications', notificationController.getRouter());

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
