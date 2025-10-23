"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const partner_stores_service_1 = require("../src/partner-stores/partner-stores.service");
async function testDisconnectUsesOrgScopedDelete() {
    const orgId = 'org-1';
    const connectionId = 'connection-1';
    const expectedConnection = { id: connectionId, orgId };
    let deleteArgs = undefined;
    const service = new partner_stores_service_1.PartnerStoresService({
        partnerStore: {
            delete: async (args) => {
                deleteArgs = args;
                return expectedConnection;
            },
        },
    });
    const result = await service.disconnect(orgId, connectionId);
    node_assert_1.strict.deepStrictEqual(deleteArgs, { where: { orgId_id: { orgId, id: connectionId } } });
    node_assert_1.strict.deepStrictEqual(result, expectedConnection);
}
async function run() {
    await testDisconnectUsesOrgScopedDelete();
    console.log('All partner store service tests passed.');
}
run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//# sourceMappingURL=partner-stores.service.spec.js.map