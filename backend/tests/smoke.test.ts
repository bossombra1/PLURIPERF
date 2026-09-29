import { beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

let app: import('express').Express;

beforeAll(async () => {
  process.env.DATABASE_URL ||= 'postgresql://postgres:postgres@localhost:5432/pluriperf';
  process.env.NODE_ENV = 'test';
  ({ default: app } = await import('../src/index'));
});

describe('PostgreSQL backend smoke tests', () => {
  it('exposes health without a database query', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('keeps protected auth endpoints protected', async () => {
    const response = await request(app).get('/api/v1/auth/me');
    expect(response.status).toBe(401);
  });
});
