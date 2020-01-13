'use strict';

var define = require('define-properties');
var ToString = require('es-abstract/2019/ToString');
var callBound = require('es-abstract/helpers/callBound');
var $replace = callBound('String.prototype.replace');
var syntaxChars = /[\^$\\.*+?()[\]{}|]/g;

var escapeShim = function escape(S) {
	return $replace(ToString(S), syntaxChars, '\\$&');
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
