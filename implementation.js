'use strict';

// var CodePointsToString = require('es-abstract/2023/CodePointsToString');
var ToString = require('es-abstract/2023/ToString');
var StringToCodePoints = require('es-abstract/2023/StringToCodePoints');
// var UTF16EncodeCodePoint = require('es-abstract/2023/UTF16EncodeCodePoint');
var regexTester = require('safe-regex-test');
var forEach = require('for-each');

var callBound = require('call-bind/callBound');

var $indexOf = callBound('Array.prototype.indexOf');
var $join = callBound('Array.prototype.join');
var $push = callBound('Array.prototype.push');

var asciiPunctuators = "(){}[]|,.?*+-^$=<>\\/#&!%:;@~'\"`";

var isDecimalDigit = regexTester(/^\d$/);
var isWhiteSpace = regexTester(/^\s$/);

module.exports = function escape(S) {
	var str = ToString(S); // step 1

	var cpList = StringToCodePoints(str); // step 2

	var toEscape = StringToCodePoints(asciiPunctuators); // step 3

	var escapedList = []; // step 4

	forEach(cpList, function (c) { // step 5
		if (escapedList.length === 0 && isDecimalDigit(c)) { // step 5.a
			$push(escapedList, '\u005c', '\u0078', '\u0033'); // step 5.a.i - 5.a.iii
		} else if ($indexOf(toEscape, c) > -1 || isWhiteSpace(c)) { // step 5.b
			$push(escapedList, '\u005c'); // step 5.b.i
		}
		// c. Append the elements of UTF16EncodeCodePoint(c) to escapedList.
		$push(escapedList, c);
	});

	// return CodePointsToString(escapedList); // step 6
	return $join(escapedList, '');
};
