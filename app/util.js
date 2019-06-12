const config = require('./config');

const util = {}

util.handleError = function(e) {

  setImmediate(() => { console.log(e) } ); 

}

module.exports = util
