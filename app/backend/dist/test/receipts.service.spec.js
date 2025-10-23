"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const common_1 = require("@nestjs/common");
const receipts_service_1 = require("../src/receipts/receipts.service");
async function testUpdateIncludesOrgId() {
    const orgId = 'org-1';
    const receiptId = 'receipt-1';
    const data = { status: 'valido' };
    const expectedReceipt = { id: receiptId, orgId };
    const capturedCalls = [];
    const service = new receipts_service_1.ReceiptsService({
        receipt: {
            updateMany: async (args) => {
                capturedCalls.push(args);
                return { count: 1 };
            },
            findFirstOrThrow: async (args) => {
                capturedCalls.push(args);
                return expectedReceipt;
            },
        },
    });
    const result = await service.update(orgId, receiptId, data);
    node_assert_1.strict.deepStrictEqual(result, expectedReceipt);
    node_assert_1.strict.deepStrictEqual(capturedCalls[0], { where: { id: receiptId, orgId }, data });
    node_assert_1.strict.deepStrictEqual(capturedCalls[1], { where: { id: receiptId, orgId } });
}
async function testUpdateOtherOrgThrows() {
    const orgId = 'org-1';
    const receiptId = 'receipt-1';
    const data = { status: 'valido' };
    let findCalled = false;
    const service = new receipts_service_1.ReceiptsService({
        receipt: {
            updateMany: async () => ({ count: 0 }),
            findFirstOrThrow: async () => {
                findCalled = true;
                return null;
            },
        },
    });
    await node_assert_1.strict.rejects(() => service.update(orgId, receiptId, data), common_1.NotFoundException);
    node_assert_1.strict.strictEqual(findCalled, false, 'findFirstOrThrow should not be called when update fails');
}
async function testCreateIncludesOrgId() {
    const orgId = 'org-1';
    const data = { status: 'pending', value: 100 };
    const capturedCalls = [];
    const created = { id: 'receipt-1', ...data, orgId };
    const service = new receipts_service_1.ReceiptsService({
        receipt: {
            create: async (args) => {
                capturedCalls.push(args);
                return created;
            },
        },
    });
    const result = await service.create(orgId, data);
    node_assert_1.strict.deepStrictEqual(result, created);
    node_assert_1.strict.deepStrictEqual(capturedCalls[0], {
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
    const capturedCalls = [];
    const expectedResult = [{ id: 'receipt-1' }];
    const service = new receipts_service_1.ReceiptsService({
        receipt: {
            findMany: async (args) => {
                capturedCalls.push(args);
                return expectedResult;
            },
        },
    });
    const result = await service.list(orgId, query);
    node_assert_1.strict.deepStrictEqual(result, expectedResult);
    node_assert_1.strict.deepStrictEqual(capturedCalls[0], {
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
//# sourceMappingURL=receipts.service.spec.js.map