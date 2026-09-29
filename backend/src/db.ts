import { Pool, type QueryResult, type QueryResultRow } from 'pg';
import { config } from './config';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL must be set');

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: Number(process.env.DB_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT_MS || 30_000),
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT_MS || 10_000),
  ssl: config.env === 'production' && process.env.DB_SSL !== 'false' ? { rejectUnauthorized: false } : undefined,
});

export async function query<T extends QueryResultRow = QueryResultRow>(text: string, values: unknown[] = []): Promise<QueryResult<T>> {
  return pool.query<T>(text, values);
}

export async function transaction<T>(work: (client: import('pg').PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await work(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
