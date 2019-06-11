const database = require('../database');

module.exports = function(app, db) {

  app.post('/images', (req, res) => {

    // Create a new image url entry with key and search meta information
console.log(req.body);

    // Do database access 
    database.checkit();

    res.send('Image created');

  });

};
