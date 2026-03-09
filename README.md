

# Daat Yehudit Management System

## Overview

Daat Yehudit is a comprehensive full-stack web application designed for managing financial and administrative operations of a religious organization. The system handles donor management, avrechim (scholars) tracking, debt management, expenses, and various financial summaries. It provides a user-friendly interface for administrators to oversee donations, yahrzeits, milgot (scholarships), and organizational links.

## Features

- **Donor Management**: Add, edit, and track donors with donation history, yahrzeit information, and contact details
- **Avrechim Tracking**: Manage scholars with personal details, activity status, and associated milgot
- **Debt Management**: Track given and taken debts with payment status
- **Expense Tracking**: Record and categorize organizational expenses
- **Financial Summaries**: Generate comprehensive financial reports with filtering capabilities
- **Milgot Management**: Handle scholarship assignments and tracking
- **Link Management**: Store and organize important organizational links
- **Email Notifications**: Automated email services for reminders and notifications
- **Data Export**: Export donor and avrechim details to Excel format
- **Responsive UI**: Modern Material-UI based interface

## Architecture

The application follows a modular full-stack architecture:

- **Frontend**: React single-page application with component-based structure
- **Backend**: Express.js REST API server with MVC pattern
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication system
- **Background Jobs**: Cron jobs for automated tasks (donations, emails)
- **Email Service**: Nodemailer integration for notifications

## Tech Stack

### Frontend
- React 19.2.0
- Material-UI (MUI) 7.3.4
- React Router DOM 7.9.4
- Axios 1.12.2
- React Hook Form 7.69.0
- Yup validation
- XLSX for Excel export

### Backend
- Node.js
- Express 5.1.0
- MongoDB with Mongoose 8.15.1
- JWT for authentication
- bcrypt for password hashing
- Nodemailer 7.0.10
- CORS support

### Development Tools
- Nodemon for development
- Create React App
- ESLint

## API Overview

The REST API provides endpoints for all major entities:

- `/api/donors` - Donor management (CRUD operations, donations, yahrzeits)
- `/api/avrechim` - Avrechim management (CRUD, milgot assignment)
- `/api/expenses` - Expense tracking
- `/api/debts` - Debt management (given/taken debts)
- `/api/links` - Link management
- `/api/integration` - Integration endpoints
- `/api/user/login` - User authentication
- `/api/user/register` - User registration

All endpoints return JSON responses with appropriate HTTP status codes.

## Database

The application uses MongoDB as the primary database with the following main collections:

- **Donors**: Donor information, contact details, donation history
- **Avrechim**: Scholar details, activity status, milgot assignments
- **Debts**: Debt records with payment tracking
- **Expenses**: Expense entries with categorization
- **Milgot**: Scholarship information and assignments
- **Links**: Organizational links and resources
- **Users**: User accounts for authentication

## Authentication & Authorization

- **Registration**: User registration with username, password, name, email, and phone
- **Login**: JWT-based authentication (implementation in progress)
- **Password Security**: bcrypt hashing for secure password storage
- **Session Management**: JWT tokens for maintaining user sessions

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud instance)
- Git for version control

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DaatYehudit
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory with:
   ```
   PORT=1111
   MONGODB_URI=mongodb://localhost:27017/daatyehudit
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-password
   ```

5. **Start MongoDB**
   Ensure MongoDB is running on your system.

6. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```

7. **Start the frontend client**
   ```bash
   cd ../client
   npm start
   ```

8. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
DaatYehudit/
├── client/                          # React frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── Components/              # React components
│   │   │   ├── Alerts/              # Notification components
│   │   │   ├── Avrechim/            # Avrechim management
│   │   │   ├── Debts/               # Debt management
│   │   │   ├── Donors/              # Donor management
│   │   │   ├── Expenses/            # Expense tracking
│   │   │   ├── FinanceSummary/      # Financial reports
│   │   │   ├── GeneralComponents/   # Shared components
│   │   │   ├── Links/               # Link management
│   │   │   └── Milgot/              # Scholarship management
│   │   ├── MainDesign/              # Theme and styling
│   │   ├── Validation/              # Form validation
│   │   ├── App.js                   # Main app component
│   │   └── index.js                 # App entry point
│   └── package.json
├── server/                          # Express backend
│   ├── config/                      # Configuration files
│   ├── controllers/                 # Route handlers
│   ├── cron/                        # Scheduled tasks
│   ├── MailService/                 # Email utilities
│   ├── models/                      # MongoDB models
│   ├── routes/                      # API routes
│   ├── server.js                    # Server entry point
│   └── package.json
├── package.json                     # Root package file
└── README.md                        # This file
```

## UI Screenshots

*Note: Screenshots of the application interface would be included here. The application features a modern Material-UI interface with responsive design for managing donors, avrechim, debts, and financial summaries.*

- Dashboard with navigation and key metrics
- Donor management interface with add/edit forms
- Avrechim listing with status indicators
- Financial summary reports with filtering options
- Debt tracking dashboard
- Expense entry forms

For actual screenshots, please run the application locally or contact the development team.
  - models/ — data models
  - routes/ — Express route definitions
  - cron/ — scheduled tasks
  - MailService/ — email helpers
  - .env — environment variables (do not commit)
- .gitignore, README.md, root package.json

## Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- Database (e.g., MongoDB, PostgreSQL) configured as in server/config/dbConn.js
- Git

## Local setup — install
1. Clone the repo:
   git clone <repo-url>
2. Install server deps:
   cd server
   npm install
3. Install client deps:
   cd ../client
   npm install

## Environment variables (.env.example)
Create server/.env with the keys used by server/config/dbConn.js and MailService. Example (do not commit secrets):

PORT=5000
DB_URL=<your-database-connection-string>

MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=you@example.com
MAIL_PASS=<email-aplication-password>
NODE_ENV=development


## Run — development
Start server:
cd server
npm run dev
(Or node server.js depending on scripts in server/package.json.)

Start client:
cd client
npm start


## API & data model notes
- Inspect server/routes/ for available endpoints and mapping to controllers.
- Document API endpoints in routes.md or use OpenAPI/Swagger for machine-readable docs.
- Keep controllers thin; extract business logic to services where beneficial.

## Background jobs & MailService
- server/cron contains scheduled tasks — determine if they should run in a separate worker process in production.
- server/MailService centralizes mail sending logic. Use environment variables for credentials and avoid committing secrets.

## Testing & CI
- Add tests under server/tests and client/src/__tests__.
- Example scripts:
  - "test:server": runs backend tests
  - "test:client": runs frontend tests
  - "lint": runs ESLint across repo
- Add GitHub Actions to run linters and tests on PRs.

## Build & deployment notes
- Containerize with Docker for reproducible deployments.
- Provide an .env.example and keep secrets out of VCS.
- Add a health-check endpoint (e.g., GET /health) that verifies DB connectivity.
- Implement graceful shutdown in server.js to close DB connections on SIGTERM.
- Consider blue/green or rolling deployments and add readiness/liveness probes if deploying to Kubernetes.

## Troubleshooting
- Check server console logs for stack traces.
- Use browser devtools network tab for API errors.
- Confirm environment variables and DB connectivity.
- Use curl/Postman to test endpoints directly.
- Check server/cron logs separately if scheduled tasks misbehave.

## Contributing
- Fork, create a feature branch, and submit a pull request with a clear description.
- Add tests for new features and adhere to linting rules.
- Run the test and lint scripts before submitting PRs.

## Next improvements (prioritized)
1. Add server/.env.example and remove any committed secrets.
2. Add ESLint, Prettier, and Husky with lint-staged.
3. Add unit and integration tests for critical backend logic and key frontend components.
4. Add API documentation (OpenAPI/Swagger).
5. Add CI pipeline (GitHub Actions) to run lint and tests on PRs.
6. Add a deployment guide (Docker + example GitHub Actions workflow).
7. Add monitoring/alerting for production (logs, health checks, uptime).

## License
Add your preferred license (MIT, Apache-2.0, etc.) and include a LICENSE file.
