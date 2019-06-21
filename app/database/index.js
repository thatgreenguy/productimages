const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', ( err, client ) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

database = {};

database.createImage = function(product, url, meta) {
  return new Promise( async (resolve, reject) => {

    try {

      let sql = 'INSERT INTO images (product, url, meta) VALUES($1, $2, $3);'

      console.log('SQL: ', sql)

      pool.query( sql, [product, url, values] )
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

database.deleteImage = function(id) {
  return new Promise( async (resolve, reject) => {

    try {

      let sql = 'DELETE FROM images WHERE id = $1 ;'

      console.debug('SQL: ', sql)

      pool.query( sql, [id] )
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

database.listProducts = function() {
  return new Promise( async (resolve, reject) => {

    try {
  
      let sql = 'SELECT DISTINCT product FROM images;'

      console.debug('SQL: ', sql);

      pool.query(sql, [])
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

database.listImageUrls = function(product, filters) {
  return new Promise( async (resolve, reject) => {

    try {

      let sql = 'SELECT * FROM images WHERE product = $1';

      filters.forEach( word => {
        sql = sql + ` AND meta like '%${word}%' `;
      });      
      sql = sql + ';';

      console.debug('SQL: ', sql);

      pool.query(sql, [product])
      .then(res => { resolve( res ) })
      .catch(err => { reject( err ) })
      } catch ( err ) {
        reject (err)
      }
  });
};

module.exports = database;
