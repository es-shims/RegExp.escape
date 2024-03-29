'use strict';

var NumberToString = require('es-abstract/2024/Number/toString');
var StringIndexOf = require('es-abstract/2024/StringIndexOf');
var StringPad = require('es-abstract/2024/StringPad');
var StringToCodePoints = require('es-abstract/2024/StringToCodePoints');
var UnicodeEscape = require('es-abstract/2024/UnicodeEscape');
var UTF16EncodeCodePoint = require('es-abstract/2024/UTF16EncodeCodePoint');

var $TypeError = require('es-errors/type');

var isCodePoint = require('es-abstract/helpers/isCodePoint');
var forEach = require('for-each');
var regexTester = require('safe-regex-test');

var isWhiteSpace = regexTester(/^\s$/);

var punctuators = "(){}[]|,.?*+-^$=<>/#&!%:;@~'`\"\\"; // step 1

module.exports = function EncodeForRegExpEscape(c) {
	if (!isCodePoint(c)) {
		throw new $TypeError('Assertion failed: `c` must be a valid Unicode code point');
	}

	// var toEscape = StringToCodePoints(punctuators); // step 2

	var encoded = UTF16EncodeCodePoint(c);

	if (StringIndexOf(punctuators, encoded, 0) > -1 || isWhiteSpace(encoded)) { // step 3
		if (c <= 0xFF) { // step 3.a
			var hex = NumberToString(c, 16); // step 3.a.i
			return '\\x' + StringPad(hex, 2, '0', 'start'); // step 3.a.ii
		}

		var escaped = ''; // step 3.b

		var codeUnits = StringToCodePoints(encoded); // step 3.c

		forEach(codeUnits, function (cu) { // step 3.d
			escaped += UnicodeEscape(cu); // step 3.d.i
		});

		return escaped; // step 3.e
	}

	return encoded; // step 4
};
