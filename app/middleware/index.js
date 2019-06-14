const {api_base} = require('../config');

middleware = {};

middleware.logReq = () => {

  return (req, res, next) => {
    console.log('My middleware: ', req);
    next(); 
  }
};

middleware.checkMethod = () => {

  return (req, res, next) => {


// Depending on route need to check method to see if allowed or not
// drop the api_base and any query parameters from the url to get the route
// fetch the allowed methods from array by route

//method should be checked according to route
console.log('method: ' + req.method)    
console.log('orig url: ' + req.originalUrl)    
console.log('url: ' + req.url)    
console.log('base url: ' + req.baseUrl)    
console.log('path url: ' + req.path)    

    console.log('check Method is valid: ');

    next(); 
  }
};

middleware.sanitize = () => {

  return (req, res, next) => {
    console.log('Sanitize passed Data: ');
    next(); 
  }
};

middleware.validate = () => {

  return (req, res, next) => {
    console.log('Validate passed data: ');
    next(); 
  }
};

module.exports = middleware;
