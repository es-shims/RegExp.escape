'use strict';

var forEach = require('for-each');
var inspect = require('object-inspect');

module.exports = function (escape, t) {
	t.test('strings', function (st) {
		var strings = [
			'The Quick Brown Fox',
			'hello there',
			'',
			'hi. how are you?',
			'^$\\.*+?()[]{}|',
			'\uD834\uDF06.'
		];

		forEach(strings, function (str) {
			var regex = new RegExp('^' + escape(str) + '$');
			st.match(str, regex, inspect(str) + ' escapes to ' + inspect(regex) + ', which matches itself');

			var nonStr = { toString: function () { return str; } };
			var nonStrRegex = new RegExp('^' + escape(nonStr) + '$');
			st.match(String(nonStr), nonStrRegex, inspect(nonStr) + ' escapes to ' + inspect(nonStrRegex) + ', which matches itself');
		});

		st.end();
	});
};
