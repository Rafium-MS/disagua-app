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
async function run() {
    await testUpdateIncludesOrgId();
    await testUpdateOtherOrgThrows();
    console.log('All receipt service tests passed.');
}
run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//# sourceMappingURL=receipts.service.spec.js.map