# pg-info

Modified version of @wmfs/pg-info that works with cockroachdb.


# index.js
change
```
const pgTriggers = queryResults[6]	
const pgFunctions = queryResults[7]	
const pgViews = queryResults[8]
```
to
```
const pgFunctions = queryResults[6]
const pgViews = queryResults[7]
```

remove 
```
triggers: findTriggers(pgTriggers, schemaName, tableName),
```
remove
```
triggers: findTriggers(pgTriggers, schemaName, tableName),
```

add after
```
  const pgSchemas = queryResults[0]
  const pgTables = queryResults[1]
  const pgColumns = queryResults[2]
  const pgPkColumns = queryResults[3]
  const pgIndexes = queryResults[4]
  const pgFkConstraints = queryResults[5]
  const pgFunctions = queryResults[6]
  const pgViews = queryResults[7]
``` 
```
  for (const pgi of pgIndexes){
    pgi.index_keys = pgi.index_keys.replace('{', '').replace('}', '').split(',');
  }
```

# queries.js
remove
```
'pg_catalog.col_description(format(\'"%s"."%s"\',isc.table_schema,isc.table_name)::regclass::oid,isc.ordinal_position) as column_comment
```
remove
```
// List of triggers	
    'SELECT trigger_name, trigger_schema, event_object_schema, event_object_table, event_manipulation, action_condition, action_statement, action_orientation, action_timing ' +	
    'FROM information_schema.triggers ' +	
    'WHERE trigger_schema = ANY($1)',
```
modify index query
```
'ARRAY( ' +
    'SELECT a.attname FROM pg_attribute AS a WHERE a.attrelid = idx.indrelid AND a.attnum = ANY(idx.indkey) AND a.attnum > 0' +
    ') AS index_keys ' +
```
