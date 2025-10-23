import { strict as assert } from 'node:assert';
import { NotFoundException } from '@nestjs/common';
import { ReceiptsService } from '../src/receipts/receipts.service';

async function testUpdateIncludesOrgId() {
  const orgId = 'org-1';
  const receiptId = 'receipt-1';
  const data = { status: 'valido' };
  const expectedReceipt = { id: receiptId, orgId };
  const capturedCalls: unknown[] = [];

  const service = new ReceiptsService({
    receipt: {
      updateMany: async (args: unknown) => {
        capturedCalls.push(args);
        return { count: 1 };
      },
      findFirstOrThrow: async (args: unknown) => {
        capturedCalls.push(args);
        return expectedReceipt;
      },
    },
  } as any);

  const result = await service.update(orgId, receiptId, data);

  assert.deepStrictEqual(result, expectedReceipt);
  assert.deepStrictEqual(capturedCalls[0], { where: { id: receiptId, orgId }, data });
  assert.deepStrictEqual(capturedCalls[1], { where: { id: receiptId, orgId } });
}

async function testUpdateOtherOrgThrows() {
  const orgId = 'org-1';
  const receiptId = 'receipt-1';
  const data = { status: 'valido' };
  let findCalled = false;

  const service = new ReceiptsService({
    receipt: {
      updateMany: async () => ({ count: 0 }),
      findFirstOrThrow: async () => {
        findCalled = true;
        return null;
      },
    },
  } as any);

  await assert.rejects(() => service.update(orgId, receiptId, data), NotFoundException);
  assert.strictEqual(findCalled, false, 'findFirstOrThrow should not be called when update fails');
}

async function testCreateIncludesOrgId() {
  const orgId = 'org-1';
  const data = { status: 'pending', value: 100 };
  const capturedCalls: unknown[] = [];
  const created = { id: 'receipt-1', ...data, orgId };

  const service = new ReceiptsService({
    receipt: {
      create: async (args: unknown) => {
        capturedCalls.push(args);
        return created;
      },
    },
  } as any);

  const result = await service.create(orgId, data);

  assert.deepStrictEqual(result, created);
  assert.deepStrictEqual(capturedCalls[0], {
    data: { ...data, orgId },
  });
}

async function testListForwardsFilters() {
  const orgId = 'org-1';
  const query = {
    status: 'pending',
    period: 'period-1',
    brand: '',
    store: 'store-1',
    partner: 'partner-1',
  };
  const capturedCalls: unknown[] = [];
  const expectedResult = [{ id: 'receipt-1' }];

  const service = new ReceiptsService({
    receipt: {
      findMany: async (args: unknown) => {
        capturedCalls.push(args);
        return expectedResult;
      },
    },
  } as any);

  const result = await service.list(orgId, query);

  assert.deepStrictEqual(result, expectedResult);
  assert.deepStrictEqual(capturedCalls[0], {
    where: {
      orgId,
      status: 'pending',
      periodId: 'period-1',
      brandId: undefined,
      storeId: 'store-1',
      partnerId: 'partner-1',
    },
    orderBy: { uploadedAt: 'desc' },
  });
}

async function run() {
  await testCreateIncludesOrgId();
  await testListForwardsFilters();
  await testUpdateIncludesOrgId();
  await testUpdateOtherOrgThrows();
  console.log('All receipt service tests passed.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
