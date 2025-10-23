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

async function run() {
  await testUpdateIncludesOrgId();
  await testUpdateOtherOrgThrows();
  console.log('All receipt service tests passed.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
