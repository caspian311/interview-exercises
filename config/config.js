var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'hr'
    },
    port: 3000,
    db: 'mysql://root@localhost/hr_dev'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'hr'
    },
    port: 3000,
    db: 'mysql://root@localhost/hr_test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'hr'
    },
    port: 3000,
    db: 'mysql://root@localhost/hr'
    
  }
};

module.exports = config[env];
