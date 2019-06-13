middleware = {};

middleware.logReq = () => {

  return (req, res, next) => {
    console.log('My middleware: ', req);
    next(); 
  }
};

middleware.checkMethod = () => {

  return (req, res, next) => {
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
