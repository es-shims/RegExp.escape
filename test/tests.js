'use strict';

var forEach = require('for-each');

module.exports = function (escape, t) {
	t.test('simple strings', function (st) {
		var strings = [
			'The Quick Brown Fox',
			'hello there',
			''
		];
		forEach(strings, function (str) {
			st.equal(escape(str), str, JSON.stringify(str) + ' escapes to itself.');
		});
		st.end();
	});

	t.test('strings that need escaping', function (st) {
		st.equal(escape('hi. how are you?'), 'hi\\. how are you\\?');
		var syntaxCharacters = '^$\\.*+?()[]{}|';
		st.equal(escape(syntaxCharacters).length, syntaxCharacters.length * 2);
		st.equal(escape('\uD834\uDF06.'), '\uD834\uDF06\\.');
		st.end();
	});

	t.test('non-strings', function (st) {
		var strings = [
			'hello there',
			'^$\\.*+?()[]{}|',
			'\uD834\uDF06.'
		];
		forEach(strings, function (str) {
			st.equal(escape({ toString: function () { return str; } }), escape(str));
		});
		st.end();
	});
};
