'use strict';

require('es5-shim');
require('es6-shim');
var escapeShim = require('../');
escapeShim.shim();

var test = require('tape');
var defineProperties = require('define-properties');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = function f() {}.name === 'f';

test('shimmed', function (t) {
	t.equal(RegExp.escape.length, 1, 'RegExp.escape has a length of 1');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(RegExp.escape.name, 'escape', 'RegExp.escape has name "escape"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(RegExp, 'escape'), 'RegExp.escape is not enumerable');
		et.end();
	});

	require('./tests')(RegExp.escape, t);

	t.end();
});
