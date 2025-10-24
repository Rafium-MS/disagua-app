import { strict as assert } from 'node:assert';
import { DashboardService } from '../src/dashboard/dashboard.service';

async function testEntriesByUFNormalization() {
  const orgId = 'org-1';
  const periodId = 'period-1';

  const entries = [
    { store: { uf: 'SP' }, total: 100 },
    { store: { uf: 'sp' }, total: 50 },
    { store: { uf: 'RJ' }, total: 75 },
    { store: { uf: 'rj' }, total: 25 },
    { store: { uf: null }, total: 10 },
  ];

  const prismaMock = {
    reportPeriod: {
      findUnique: async () => ({ id: periodId }),
    },
    receipt: {
      groupBy: async () => [],
      findMany: async () => [],
    },
    reportEntry: {
      groupBy: async () => [],
      findMany: async () => entries,
    },
    brand: {
      findMany: async () => [],
    },
    partner: {
      findMany: async () => [],
    },
  };

  const service = new DashboardService(prismaMock as any);
  const result = await service.get(orgId, 2024, 10);

  const expected = [
    { uf: 'SP', total: 150 },
    { uf: 'RJ', total: 100 },
    { uf: 'NA', total: 10 },
  ];

  assert.deepStrictEqual(result.entriesByUF, expected);
}

async function run() {
  await testEntriesByUFNormalization();
  console.log('All dashboard service tests passed.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
