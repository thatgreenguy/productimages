const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', ( err, client ) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

database = {};

database.createImage = function(product, url, meta) {
  return new Promise( async (resolve, reject) => {

    let sql = 'INSERT INTO images (product, url, meta) VALUES($1, $2, $3);'
    try {
      pool.query( sql, [product, url, values] )
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

database.listProducts = function() {
  return new Promise( async (resolve, reject) => {

    let sql = 'SELECT DISTINCT product FROM images;'
    try {
      pool.query(sql, [])
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

database.listImageUrls = function(product) {
  return new Promise( async (resolve, reject) => {

    let sql = 'SELECT * FROM images WHERE product = $1;'
    try {
      pool.query(sql, [product])
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

module.exports = database;
