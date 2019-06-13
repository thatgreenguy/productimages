const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', ( err, client ) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

database = {};

database.createImage = function(product, url, meta) {

  let sql = 'INSERT INTO images (product, url, meta) VALUES($1, $2, $3);'

  pool.query(sql, [product, url, meta])
  .then(res => { return res })
  .catch(err => { throw err })

};

database.listProducts = function() {

  let sql = 'SELECT DISTINCT product FROM images;'

  pool.query(sql, [])
  .then(res => { return res })
  .catch(err => { throw err })

};

database.listImageUrls = function(product) {

  let sql = 'SELECT * FROM images WHERE product = $1;'

  pool.query(sql, [product])
  .then(res => { return res })
  .catch(err => { throw err })

};

module.exports = database;
