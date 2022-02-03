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

remove
```
triggers: findTriggers(pgTriggers, schemaName, viewName),
```

replace
```
function findIndexes (pgIndexes, schemaName, tableName) {
  return pgIndexes
    .filter(index => index.table_name === `${schemaName}.${tableName}`)
```
with 
```
.filter(index => index.table_name === `${tableName}`)
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
