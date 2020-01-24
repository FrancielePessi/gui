const config = require('./default.conf');

config.clearDb = true;
config.tests = './Scenarios/Sanity_test.js',
exports.config = config;
