const { Pool, Client } = require('pg');

const pool = new Pool()

const db = {}

db.test = async function() {

  const res = await pool.query('SELECT NOW()')
  console.log('Oi Oi - ' + JSON.stringify(res.rows[0]) )
  await pool.end()

} 

module.exports = db
