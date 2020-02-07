const config = require('./default.conf');
//const config = require ('./Scenarios/SANITY')

config.clearDb = true;
config.tests = './Scenarios/Sanity_test.js',
exports.config = config;
