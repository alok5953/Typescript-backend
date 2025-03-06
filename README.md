# TypeScript PostgreSQL Backend Starter

A production-ready Node.js backend starter template built with TypeScript, PostgreSQL, and modern development practices. Perfect for quickly bootstrapping your next backend project with a solid foundation.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue.svg)](https://www.postgresql.org/)

## 👨‍💻 Author
**Alok Kaushik**  
Email: alokkaushik5953@gmail.com  
GitHub: [@alok5953](https://github.com/alok5953)

## 🚀 Features

- **TypeScript** - Write better, more maintainable code with TypeScript
- **PostgreSQL** - Robust and reliable database with pg-promise
- **Automated Migrations** - Smart migration system that only runs new files
- **Modern Architecture** - Clean project structure following best practices
- **API Ready** - Express.js setup with versioned routing
- **Development Tools** - Hot reload, debugging, and monitoring included
- **Production Ready** - Proper error handling and environment configuration
- **Well Documented** - Comprehensive documentation and examples

## 🛠️ Tech Stack

- Node.js
- TypeScript
- PostgreSQL
- Express.js
- pg-promise
- pg-monitor (for development)
- dotenv (for configuration)

## 📦 Quick Start

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env` file and update with your PostgreSQL credentials
- Make sure PostgreSQL is running

3. Run migrations:
```bash
npm run migrate
```

4. Start the development server:
```bash
npm run dev
```

## Database Migrations

- Place new SQL migration files in the `migrations` folder
- Name files with sequential numbers (e.g., `001_`, `002_`)
- Run `npm run migrate` to execute new migrations
- Only new migrations will be executed
- Migration history is tracked in the `migrations` table

## 📁 Project Structure

```
├── src/
│   ├── config.ts         # Configuration management
│   ├── index.ts         # Application entry point
│   ├── db/              # Database setup and utilities
│   │   ├── index.ts     # Database connection
│   │   ├── diagnostic.ts # Monitoring setup
│   │   └── initOptions.ts # Database initialization
│   └── routes/          # API routes
│       └── v1/          # API version 1
├── scripts/
│   └── migrate.ts       # Database migration script
├── migrations/          # SQL migration files
└── README.md           # Project documentation
```

## 🔄 Database Migrations

- Place new SQL migration files in the `migrations` folder
- Name files sequentially (e.g., `001_`, `002_`)
- Only new migrations will be executed
- Migration history is tracked in database

Example migration file:
```sql
-- migrations/001_initial_schema.sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript code
- `npm start`: Run production server
- `npm run migrate`: Run database migrations

## 📝 Environment Variables

```env
# Required variables in .env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password

# Optional
PORT=3000
ENV=development
```

## 📄 License

This project is MIT licensed - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](https://github.com/alok5953/Typescript-backend/issues).

## ⭐ Show your support

Give a ⭐️ if this project helped you! It helps others discover this template.
