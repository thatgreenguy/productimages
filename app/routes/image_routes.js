module.exports = function(app, db) {

  app.post('/images', (req, res) => {

    // Create a new image url entry with key and search meta information
console.log(req.body);
    res.send('Image created');

  });

};
