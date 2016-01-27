/*
 * hejun
**/
/*
 * Dependency: none
**/

"use strict";

/**
 * Function - ES5 15.3
 *
 * ES5 15.3.4.5 Function.prototype.bind (thisArg [, arg1 [, arg2, ...]])
 */

// ES5 15.3.4.5 Function.prototype.bind (thisArg [, arg1 [, arg2, ...]])
// modified and migrated from prototype-1.7.js
if (typeof Function.prototype.bind !== 'function') {
    Function.prototype.bind = function (thisArg) {
        var method = this,
            slice = Array.prototype.slice,
            args = slice.call(arguments, 1);
        if (arguments.length < 2 && thisArg === undefined) {
            return this;
        }
        return function () {
            var a = args.concat(slice.call(arguments, 0));
            return method.apply(thisArg, a);
        };
    };
}

/**
 * Array - ES5 15.4
 *
 * ES5 15.4.3.2  Array.isArray ( arg )
 * ES5 15.4.4.14 Array.prototype.indexOf ( searchElement [ , fromIndex ] )
 * ES5 15.4.4.15 Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
 * ES5 15.4.4.16 Array.prototype.every ( callbackfn [ , thisArg ] )
 * ES5 15.4.4.17 Array.prototype.some ( callbackfn [ , thisArg ] )
 * ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
 * ES5 15.4.4.19 Array.prototype.map ( callbackfn [ , thisArg ] )
 * ES5 15.4.4.20 Array.prototype.filter ( callbackfn [ , thisArg ] )
 * ES5 15.4.4.21 Array.prototype.reduce ( callbackfn [ , initialValue ] )
 * ES5 15.4.4.22 Array.prototype.reduceRight ( callbackfn [ , initialValue ] )
 */

// ES5 15.4.3.2  Array.isArray ( arg )
if (typeof Array.isArray !== 'function') {
    Array.isArray = function (value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };
}

// ES5 15.4.4.14 Array.prototype.indexOf ( searchElement [ , fromIndex ] )
// modified and migrated from prototype-1.7.js
if (typeof Array.prototype.indexOf !== 'function') {
    Array.prototype.indexOf = function (item, i) {
        var length = this.length;
        i = i || 0;
        if (i < 0) {
            i = length + i;
        }
        for (i; i < length; i += 1) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}

// ES5 15.4.4.15 Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
if (typeof Array.prototype.lastIndexOf !== 'function') {
    Array.prototype.lastIndexOf = function (item, i) {
        var length = this.length;
        i = i || length;
        if (i < 0) {
            i = length + i;
        }
        i = Math.min(i, length - 1);
        for (i; i >= 0; i -= 1) {
            if (this[i] === item) {
                return i;
            }
        }
        return -1;
    };
}

// ES5 15.4.4.16 Array.prototype.every ( callbackfn [ , thisArg ] )
if (typeof Array.prototype.every !== 'function') {
    Array.prototype.every = function (callbackfn, thisArg) {
        var i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined && !callbackfn.call(thisArg, this[i], i, this)) {
                return false;
            }
        }
        return true;
    };
}

// ES5 15.4.4.17 Array.prototype.some ( callbackfn [ , thisArg ] )
if (typeof Array.prototype.some !== 'function') {
    Array.prototype.some = function (callbackfn, thisArg) {
        var i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined && callbackfn.call(thisArg, this[i], i, this)) {
                return true;
            }
        }
        return false;
    };
}

// ES5 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
if (typeof Array.prototype.forEach !== 'function') {
    Array.prototype.forEach = function (callbackfn, thisArg) {
        var i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined) {
                callbackfn.call(thisArg, this[i], i, this);
            }
        }
    };
}

// ES5 15.4.4.19 Array.prototype.map ( callbackfn [ , thisArg ] )
if (typeof Array.prototype.map !== 'function') {
    Array.prototype.map = function (callbackfn, thisArg) {
        var i,
            len = this.length,
            res = [];
        res.length = len;
        for (i = 0; i < len; i += 1) {
            if (this[i] !== undefined) {
                res[i] = callbackfn.call(thisArg, this[i], i, this);
            }
        }
        return res;
    };
}

// ES5 15.4.4.20 Array.prototype.filter ( callbackfn [ , thisArg ] )
if (typeof Array.prototype.filter !== 'function') {
    Array.prototype.filter = function (callbackfn, thisArg) {
        var res = [], i, len;
        for (i = 0, len = this.length; i < len; i += 1) {
            if (this[i] !== undefined && callbackfn.call(thisArg, this[i], i, this)) {
                res.push(this[i]);
            }
        }
        return res;
    };
}

// ES5 15.4.4.21 Array.prototype.reduce ( callbackfn [ , initialValue ] )
if (typeof Array.prototype.reduce !== 'function') {
    Array.prototype.reduce = function (callbackfn, initialValue) {
        var len = this.length,
            k = 0,
            accumulator;
        // check callbackfn
        // no value to return if no initial value and an empty array
        if (typeof callbackfn !== 'function' || (len === 0 && arguments.length === 1)) {
            throw new TypeError();
        }

        if (arguments.length > 1) {
            accumulator = initialValue;
        } else {
            while (k < len) {
                if (this[k] !== undefined) {
                    accumulator = this[k];
                    k += 1;
                    break;
                }
                k += 1;
            }
            if (k === len) {
                throw new TypeError();
            }
        }

        while (k < len) {
            if (this[k] !== undefined) {
                accumulator = callbackfn.call(null, accumulator, this[k], k, this);
            }
            k += 1;
        }
        return accumulator;
    };
}

// ES5 15.4.4.22 Array.prototype.reduceRight ( callbackfn [ , initialValue ] )
if (typeof Array.prototype.reduceRight !== 'function') {
    Array.prototype.reduceRight = function (callbackfn, initialValue) {

        var len = this.length,
            k = len - 1,
            accumulator;

        // check callbackfn
        // no value to return if no initial value and an empty array
        if (typeof callbackfn !== 'function' || (len === 0 && arguments.length === 1)) {
            throw new TypeError();
        }

        if (arguments.length > 1) {
            accumulator = initialValue;
        } else {
            while (k >= 0) {
                if (this[k] !== undefined) {
                    accumulator = this[k];
                    k -= 1;
                    break;
                }
                k -= 1;
            }
            if (k < 0) {
                throw new TypeError();
            }
        }

        while (k >= 0) {
            if (this[k] !== undefined) {
                accumulator = callbackfn.call(null, accumulator, this[k], k, this);
            }
            k -= 1;
        }

        return accumulator;
    };
}

/**
 * String - ES5 15.5
 *
 * ES5 15.5.4.20 String.prototype.trim ( )
 */

// ES5 15.5.4.20 String.prototype.trim ( )
// http://blog.stevenlevithan.com/archives/faster-trim-javascript
if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
        //1.fast cross-browser
        //return String(this).replace(/^\s\s*/, '').replace(/\s\s*$/, '');

        //2.long strings exceptionally fast in all browsers
        var i = 0,
            j = this.length,
            //note: in IE6~8, '\v' !== '\u000b', '\v' === 'v'
            ws = /[\t\n\b\f\r\x0b\x20\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/;
        while (ws.test(this.charAt(i))) {
            i += 1;
        }
        while (ws.test(this.charAt(j - 1))) {
            j -= 1;
        }
        return this.slice(i, j);
    };
}

/**
 * Date - ES5 15.9
 *
 * ES5 15.9.4.4  Date.now ( )
 * ES5 15.9.5.43 Date.prototype.toISOString ( )
 */

// ES5 15.9.4.4 Date.now ( )
if (typeof Date.now !== 'function') {
    Date.now = function () {
        return new Date().getTime();
    };
}

// ES5 15.9.5.43 Date.prototype.toISOString ( )
if (typeof Date.prototype.toISOString !== 'function') {
    Date.prototype.toISOString = function () {
        function f(n, len) {    //Format integers to have at least (len) digits.
            var i;
            len = len || 2;
            if (/[0-9]/.test(n)) {
                n = n.toString();
                for (i = n.length; i < len; i += 1) {
                    n = '0' + n;
                }
            }
            return n;
        }
        return this.getUTCFullYear()   + '-' +
            f(this.getUTCMonth() + 1) + '-' +
            f(this.getUTCDate())      + 'T' +
            f(this.getUTCHours())     + ':' +
            f(this.getUTCMinutes())   + ':' +
            f(this.getUTCSeconds())   + '.' +
            f(this.getUTCMilliseconds(), 3) + 'Z';
    };
}

/**
 * Object - ES5 15.2
 *
 * Ignore. hard to implement.
 */
if (typeof Object.keys !== 'function') {
    Object.keys = function(obj) {
        var keys = [];
        if ( typeof obj !== 'object' && (typeof obj !== 'function' || obj === null) ) {
            throw new TypeError('Object.keys called on non-object');
        } else {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    keys.push(i);
                }
            }
        }
        return keys;
    };
}


if (typeof Object.create !== 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    // To save on memory, use a shared constructor
    function Temp() {}

    // make a safe reference to Object.prototype.hasOwnProperty
    var hasOwn = Object.prototype.hasOwnProperty;

    return function (O) {
      // 1. If Type(O) is not Object or Null throw a TypeError exception.
      if (typeof O !== 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }

      // 2. Let obj be the result of creating a new object as if by the
      //    expression new Object() where Object is the standard built-in
      //    constructor with that name
      // 3. Set the [[Prototype]] internal property of obj to O.
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // Let's not keep a stray reference to O...

      // 4. If the argument Properties is present and not undefined, add
      //    own properties to obj as if by calling the standard built-in
      //    function Object.defineProperties with arguments obj and
      //    Properties.
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }

      // 5. Return obj
      return obj;
    };
  })();
}

/**
 * JSON
 *
 * require crockford's http://www.JSON.org/json2.js
 */
