-- @block Drop all database

DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Loop through all the tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        -- Drop each table
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

