# regexp.escape <sup>[![Version Badge][2]][1]</sup>

[![Build Status][3]][4]
[![dependency status][5]][6]
[![dev dependency status][7]][8]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][11]][1]

A robust & optimized ES3-compatible polyfill for [the `RegExp.escape` proposal for ECMAScript 7](https://github.com/benjamingr/RexExp.escape/).

Use it to safely escape RegExp special tokens for use in `new RegExp`.

Use it as a standalone function, or call its `shim` method to install it as a polyfill.

## Example

```js
var escape = require('regexp.escape');
var assert = require('assert');

var str = 'hello. how are you?';
var regex = new RegExp(escape(str), 'g');
assert.equal(String(regex), '/hello\. how are you\?/g');
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[1]: https://npmjs.org/package/regexp.escape
[2]: http://versionbadg.es/es-shims/regexp.escape.svg
[3]: https://travis-ci.org/es-shims/regexp.escape.svg
[4]: https://travis-ci.org/es-shims/regexp.escape
[5]: https://david-dm.org/es-shims/regexp.escape.svg
[6]: https://david-dm.org/es-shims/regexp.escape
[7]: https://david-dm.org/es-shims/regexp.escape/dev-status.svg
[8]: https://david-dm.org/es-shims/regexp.escape#info=devDependencies
[11]: https://nodei.co/npm/regexp.escape.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/regexp.escape.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/regexp.escape.svg
[downloads-url]: http://npm-stat.com/charts.html?package=regexp.escape
