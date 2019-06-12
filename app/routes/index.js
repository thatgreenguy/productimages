const pingRoutes = require('./ping_routes');
const imageRoutes = require('./image_routes');

module.exports = function(app, db) {

  pingRoutes(app, db);
  imageRoutes(app, db);

};
