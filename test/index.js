'use strict';

var escapeShim = require('../');
var test = require('tape');

test('as a function', function (t) {
	require('./tests')(escapeShim, t);

	t.end();
});
