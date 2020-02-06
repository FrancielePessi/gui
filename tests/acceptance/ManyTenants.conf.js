const config = require('./default.conf');

config.clearDb = true;
config.tests = './Scenarios/Sanity_test.js',
config.tests = './Scenarios/TenantCrud_test.js',
config.tests = './Scenarios/ManyTenants_test.js',
exports.config = config;
