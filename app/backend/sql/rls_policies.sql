-- Enable RLS and add orgId policy as needed (example for "Brand").
ALTER TABLE "Brand" ENABLE ROW LEVEL SECURITY;
CREATE POLICY brand_isolate ON "Brand"
  USING ("orgId"::text = current_setting('app.current_org', true));
-- Repeat for other tables and set app.current_org per request.
