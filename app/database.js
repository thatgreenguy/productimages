const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', ( err, client ) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const database = {};

database.checkit = function() {

  pool.connect(( err, client, done ) => {

    if ( err ) throw err;
  
    client.query('SELECT * FROM images', ( err, res ) => {
      done();
 
      if ( err ) {
        console.error( err.stack );
      } else {
        console.log( res.rows[0] );
      }

    });  
  });
}

module.exports = database;
