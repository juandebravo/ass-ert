var ass = require('./lib/ass');
var Chain = require('./lib/chain');
var AssError = require('./lib/error');
var should = require('./lib/should');
var patches = require('./lib/patches');

// Register the default matchers
require('./lib/matchers/core');
require('./lib/matchers/coordination');
require('./lib/matchers/quantifiers');
require('./lib/matchers/promise');


// Bundle some of the internal stuff with the ass function
ass.Chain = Chain;
ass.Error = AssError;

// Forward the should installer
// Note: make them arity-0 to allow beforeEach(ass.should) in Mocha
ass.should = function (/* name */) {
  should(arguments.length > 0 ? arguments[0] : undefined);
  return ass;
};
ass.should.restore = function (/* name */) {
  should.restore(arguments.length > 0 ? arguments[0] : undefined);
  return ass;
};


// Patch third party libraries to understand ass-ert experessions. We depend
// on patching lodash for the library to work correctly, however the rest are
// optional.
patches.lodash(require('lodash'));

if (global.sinon && global.sinon.match || require.resolve && require.resolve('sinon')) {
  patches.sinon(global.sinon || require('sinon'));
}


module.exports = ass;
