-- Enable RLS and add simple org_id based policies
-- Run manually after migrations, or wire into migration scripts.

DO $$
DECLARE tbl text;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname='public'
      AND tablename IN ('Brand','Store','Partner','PartnerStore','ReportPeriod','ReportEntry','Receipt','AuditLog','User','Org')
  LOOP
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);
  END LOOP;
END$$;

-- Example policy for Brand (repeat accordingly)
DROP POLICY IF EXISTS brand_isolate ON "Brand";
CREATE POLICY brand_isolate ON "Brand"
  USING ("orgId"::text = current_setting('app.current_org', true));

-- At request start (after auth), set:
-- SELECT set_config('app.current_org', :orgId, true);
