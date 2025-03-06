import fs from 'fs/promises';
import path from 'path';
import db from '../src/db'

const MIGRATIONS_DIR = path.join(__dirname, '../migrations');

interface MigrationRecord {
    id: string;
    name: string;
    executed_at: Date;
}

async function ensureMigrationsTable() {
    await db.none(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
}

async function getExecutedMigrations(): Promise<string[]> {
    const records = await db.any<MigrationRecord>('SELECT name FROM migrations');
    return records.map(record => record.name);
}

async function runMigration(filename: string, content: string) {
    try {
        await db.tx(async t => {
            await t.none(content);
            await t.none('INSERT INTO migrations(name) VALUES($1)', filename);
        });
        console.log(`✓ Executed migration: ${filename}`);
    } catch (error) {
        console.error(`✗ Failed to execute migration ${filename}:`, error);
        throw error;
    }
}

async function migrate() {
    try {
        // Ensure migrations table exists
        await ensureMigrationsTable();

        // Get list of executed migrations
        const executedMigrations = await getExecutedMigrations();

        // Read all migration files
        const files = await fs.readdir(MIGRATIONS_DIR);
        const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();

        // Find new migrations
        const newMigrations = sqlFiles.filter(file => !executedMigrations.includes(file));

        if (newMigrations.length === 0) {
            console.log('No new migrations to execute.');
            return;
        }

        // Execute new migrations
        for (const file of newMigrations) {
            const content = await fs.readFile(path.join(MIGRATIONS_DIR, file), 'utf-8');
            await runMigration(file, content);
        }

        console.log('All migrations completed successfully.');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await db.$pool.end();
    }
}

// Run migrations
migrate();
