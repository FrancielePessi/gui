const config = require('./default.conf');
//const config = require ('./Scenarios/SANITY')

config.clearDb = true;
config.tests = './Scenarios/SANITY/*',
exports.config = config;
