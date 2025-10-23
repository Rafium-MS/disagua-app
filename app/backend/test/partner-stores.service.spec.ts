import { strict as assert } from 'node:assert';
import { PartnerStoresService } from '../src/partner-stores/partner-stores.service';

async function testDisconnectUsesOrgScopedDelete() {
  const orgId = 'org-1';
  const connectionId = 'connection-1';
  const expectedConnection = { id: connectionId, orgId };
  let deleteArgs: unknown = undefined;

  const service = new PartnerStoresService({
    partnerStore: {
      delete: async (args: unknown) => {
        deleteArgs = args;
        return expectedConnection;
      },
    },
  } as any);

  const result = await service.disconnect(orgId, connectionId);

  assert.deepStrictEqual(deleteArgs, { where: { orgId_id: { orgId, id: connectionId } } });
  assert.deepStrictEqual(result, expectedConnection);
}

async function run() {
  await testDisconnectUsesOrgScopedDelete();
  console.log('All partner store service tests passed.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
