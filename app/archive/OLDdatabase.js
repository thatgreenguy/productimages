const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', ( err, client ) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const database = {};

database.imageAdd = async function() {

  const client = await pool.connect();
  try {
 
    const res = await client.query()

  } finally {
    client.release();
  }

}

database.checkit = function() {

  pool.connect(( err, client, done ) => {

    if ( err ) throw err;
  
    client.query('SELECT * FROM images', ( err, res ) => {
      done();
 
      if ( err ) {
        console.error( err.stack );
      } else {
        console.log( JSON.stringify(res) );
      }

    });  
  });
}

module.exports = pool;
