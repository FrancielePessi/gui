const config = require('./default.conf');

config.clearDb = true;
config.tests = './Scenarios/ManyTenants_test.js',
exports.config = config;
