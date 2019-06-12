module.exports = function(app, db) {

  app.get('/ping', (req, res) => {

    res.send('Ping: OK');

  });

};
