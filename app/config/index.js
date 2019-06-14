const dotenv = require('dotenv')
dotenv.config()

const dbInfo = process.env.POSTGRESDB_PORT.split(':')

console.log(JSON.stringify(dbInfo))

if(!process.env.PGHOST) process.env.PGHOST = dbInfo[1].replace('//', ''); 
if(!process.env.PGPORT) process.env.PGPORT = dbInfo[2]; 
if(!process.env.PGDATABASE) process.env.PGDATABASE = 'productimages'; 
if(!process.env.PGUSER) process.env.PGUSER = 'postgres'; 

const configuration = {
  api_port: process.env.API_PORT || 8080,
  api_base: process.env.API_BASE || '/api/v1/productimages/',
  db_host: process.env.PGHOST,
  db_port: process.env.PGPORT,
  db_database: process.env.PGDATABASE,
  db_user: process.env.PGUSER,

  db_pass: process.env.PGPASSWORD
}
console.log('Configuration: ' + JSON.stringify(configuration) )

module.exports = {
  api_port: process.env.API_PORT || 8080,
  api_base: process.env.API_BASE || '/api/v1/productimages/',
  db_host: process.env.PGHOST,
  db_port: process.env.PGPORT,
  db_database: process.env.PGDATABASE,
  db_user: process.env.PGUSER,
  db_pass: process.env.PGPASSWORD
}

