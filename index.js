'use strict';

var define = require('define-properties');
var ES = require('es-abstract/es2018');
var bind = require('function-bind');
var replace = bind.call(Function.call, String.prototype.replace);
var syntaxChars = /[\^$\\.*+?()[]{}|]/g;

var escapeShim = function escape(S) {
	return replace(ES.ToString(S), syntaxChars, '\\$&');
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
