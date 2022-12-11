'use strict';

var ToString = require('es-abstract/2022/ToString');
var callBound = require('call-bind/callBound');
var $replace = callBound('String.prototype.replace');
var syntaxChars = /[\^$\\.*+?()[\]{}|]/g;

module.exports = function escape(S) {
	return $replace(ToString(S), syntaxChars, '\\$&');
};
