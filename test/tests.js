'use strict';

var forEach = require('for-each');
var inspect = require('object-inspect');

module.exports = function (escape, t) {
	t.test('strings', function (st) {
		var strings = [
			'The Quick Brown Fox',
			'hello there',
			'',
			'hi. how are you? 💩',
			'^$\\.*+?()[]{}|',
			'\uD834\uDF06.',
			'123 Fake St.'
		];

		forEach(strings, function (str) {
			var regex = new RegExp('^' + escape(str) + '$');
			st.match(str, regex, inspect(str) + ' escapes to ' + inspect(regex) + ', which matches itself');

			var nonStr = { toString: function () { return str; } };
			st['throws'](
				function () { escape(nonStr); },
				TypeError,
				'does not coerce to string'
			);
		});

		st.end();
	});
};
