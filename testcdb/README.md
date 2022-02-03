```
npm install
node --inspect=0.0.0.0:7777 --inspect-brk test.js 
```


    SELECT ns.nspname        AS schema_name, 
    idx.indrelid :: REGCLASS AS table_name, 
    i.relname                AS index_name, 
    idx.indisunique          AS is_unique, 
    idx.indisprimary         AS is_primary, 
    am.amname                AS method,
    ARRAY(SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE) FROM generate_subscripts(idx.indkey, 1) AS k ORDER BY k) AS index_keys
    FROM pg_index AS idx 
    JOIN pg_class AS i ON i.oid = idx.indexrelid 
    JOIN pg_am AS am ON i.relam = am.oid 
    JOIN pg_namespace AS NS ON i.relnamespace = NS.OID 
    JOIN pg_user AS U ON i.relowner = U.usesysid 
    WHERE ns.nspname = 'public'
    ORDER BY CAST(idx.indrelid :: REGCLASS as text);


    SELECT ns.nspname        AS schema_name, 
    idx.indrelid :: REGCLASS AS table_name, 
    i.relname                AS index_name, 
    idx.indisunique          AS is_unique, 
    idx.indisprimary         AS is_primary, 
    am.amname                AS method,
    ARRAY(SELECT pg_get_indexdef(idx.indexrelid, k + 1, TRUE) FROM generate_subscripts(idx.indkey, 1) AS k ORDER BY k) AS index_keys
    FROM pg_index AS idx 
    JOIN pg_class AS i ON i.oid = idx.indexrelid 
    JOIN pg_am AS am ON i.relam = am.oid 
    JOIN pg_namespace AS NS ON i.relnamespace = NS.OID 
    JOIN pg_user AS U ON i.relowner = U.usesysid 
    WHERE ns.nspname = 'public'
    ORDER BY CAST(idx.indrelid :: REGCLASS as text);



    SELECT ns.nspname        AS schema_name, 
    idx.indrelid :: REGCLASS AS table_name, 
    i.relname                AS index_name, 
    idx.indisunique          AS is_unique, 
    idx.indisprimary         AS is_primary, 
    am.amname                AS method,
    ARRAY(SELECT a.attname FROM pg_attribute AS a WHERE a.attrelid = idx.indrelid AND a.attnum = ANY(idx.indkey) AND a.attnum > 0) AS index_keys
    FROM pg_index AS idx 
    JOIN pg_class AS i ON i.oid = idx.indexrelid 
    JOIN pg_am AS am ON i.relam = am.oid 
    JOIN pg_namespace AS NS ON i.relnamespace = NS.OID 
    JOIN pg_user AS U ON i.relowner = U.usesysid 
    WHERE ns.nspname = 'public'
    ORDER BY CAST(idx.indrelid :: REGCLASS as text);
