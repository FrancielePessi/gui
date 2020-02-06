const config = require('./default.conf');

config.clearDb = true;
config.tests = './Scenarios/TenantCrud_test.js',
exports.config = config;
