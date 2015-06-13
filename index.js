'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es7');
var at = require('string-at');
var bind = require('function-bind');
var join = bind.call(Function.call, Array.prototype.join);

var isSyntaxCharacter = function isSyntaxCharacter(c) {
	return c.length === 1 && '^$\\.*+?()[]{}|'.indexOf(c) > -1;
};

var escapeShim = function escape(S) {
	var str = ES.ToString(S);
	var cpListLength = 0;
	var codePoint;
	var cuList = [];
	while (cpListLength < str.length) {
		codePoint = at(str, cpListLength);
		cpListLength += codePoint.length;
		if (isSyntaxCharacter(codePoint)) {
			cuList.push('\\');
		}
		cuList.push(codePoint);
	}
	return join(cuList, '');
};

define(escapeShim, {
	method: escapeShim,
	shim: function shimRegExpEscape() {
		define(RegExp, {
			escape: escapeShim
		});
		return RegExp.escape;
	}
});

module.exports = escapeShim;
