'use strict';

var ToString = require('es-abstract/2019/ToString');
var callBound = require('es-abstract/helpers/callBound');
var $replace = callBound('String.prototype.replace');
var syntaxChars = /[\^$\\.*+?()[\]{}|]/g;

module.exports = function escape(S) {
	return $replace(ToString(S), syntaxChars, '\\$&');
};
