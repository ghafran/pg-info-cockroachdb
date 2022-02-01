var pg = require('pg'),
	pgInfo = require('../lib'),
	pgDiffSync = require('@wmfs/pg-diff-sync');

var conn = `postgres://root:@127.0.0.1:26257/mahoney`;
var conntemp = `postgres://root:@127.0.0.1:26257/mahoney_temp`;
const client = new pg.Client(conn);
const clienttemp = new pg.Client(conntemp);
client.connect();
clienttemp.connect();
console.log('db info...');
return pgInfo({
	client: client,
}).then((info) => {
	console.log('temp db info...');
	return pgInfo({
		client: clienttemp,
	}).then((infoTemp) => {
		console.log('diff...');
		var statements = pgDiffSync(info, infoTemp);
		client.end();
		clienttemp.end();
		console.log(statements);
	});
});