# TypeScript PostgreSQL Backend

A Node.js backend application with TypeScript, PostgreSQL, and automated migrations.

## Setup

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

## Available Scripts

- `npm run dev`: Start development server with hot reload
- `npm run build`: Build TypeScript code
- `npm start`: Run production server
- `npm run migrate`: Run database migrations
