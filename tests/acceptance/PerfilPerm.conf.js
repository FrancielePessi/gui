const config = require('./default.conf');

config.clearDb = true;
config.tests = './Scenarios/UsersPermCrud_test.js',
exports.config = config;
